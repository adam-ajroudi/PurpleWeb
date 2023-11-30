import * as React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import {
  createNavigatorFactory,
  DefaultNavigatorOptions,
  ParamListBase,
  CommonActions,
  TabActionHelpers,
  TabNavigationState,
  TabRouter,
  TabRouterOptions,
  useNavigationBuilder,
} from "@react-navigation/native";

// Props accepted by the view
type TabNavigationConfig = {
  //   tabBarStyle: StyleProp<ViewStyle>;
  //   contentStyle: StyleProp<ViewStyle>;
};

// Supported screen options
type TabNavigationOptions = {
  title?: string;
};

// Map of event name and the type of data (in event.data)
//
// canPreventDefault: true adds the defaultPrevented property to the
// emitted events.
type TabNavigationEventMap = {
  tabPress: {
    data: { isAlreadyFocused: boolean };
    canPreventDefault: true;
  };
};

// The props accepted by the component is a combination of 3 things
type Props = DefaultNavigatorOptions<
  ParamListBase,
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap
> &
  TabRouterOptions &
  TabNavigationConfig;

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",

    gap: 10,
  },
  content: {
    flex: 1,
    width: "100%",

    // backgroundColor: "blue",
  },
  bottomBar: {
    // marginHorizontal: 50,
    // marginVertical: 10,
    margin: 10,

    // Fully rounded corners
    borderRadius: 50,

    height: 50,

    flexDirection: "row",
    backgroundColor: "purple",

    gap: 10,
    padding: 10,

    // Center the children elements
    alignItems: "center",
    // justifyContent: "center",
    // justifyContent: "space-evenly",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 50,
    padding: 5,
  },
});

const TabNavigator = ({ initialRouteName, children, screenOptions }: Props) => {
  const { state, navigation, descriptors, NavigationContent } =
    useNavigationBuilder<
      TabNavigationState<ParamListBase>,
      TabRouterOptions,
      TabActionHelpers<ParamListBase>,
      TabNavigationOptions,
      TabNavigationEventMap
    >(TabRouter, {
      children,
      screenOptions,
      initialRouteName,
    });

  return (
    <NavigationContent>
      <View style={stylesheet.container}>
        <View style={stylesheet.content}>
          {state.routes.map((route, i) => {
            return (
              <View
                key={route.key}
                style={[
                  StyleSheet.absoluteFill,
                  { display: i === state.index ? "flex" : "none" },
                ]}
              >
                {descriptors[route.key].render()}
              </View>
            );
          })}
        </View>

        <View style={stylesheet.bottomBar}>
          {state.routes.map((route) => (
            <Pressable
              key={route.key}
              style={stylesheet.button}
              onPress={() => {
                const event = navigation.emit({
                  type: "tabPress",
                  target: route.key,
                  canPreventDefault: true,
                  data: {
                    isAlreadyFocused:
                      route.key === state.routes[state.index].key,
                  },
                });

                if (!event.defaultPrevented) {
                  navigation.dispatch({
                    ...CommonActions.navigate(route),
                    target: state.key,
                  });
                }
              }}
            >
              <Text>{descriptors[route.key].options.title || route.name}</Text>
            </Pressable>
          ))}
        </View>
      </View>
    </NavigationContent>
  );
};

export default createNavigatorFactory<
  TabNavigationState<ParamListBase>,
  TabNavigationOptions,
  TabNavigationEventMap,
  typeof TabNavigator
>(TabNavigator);
