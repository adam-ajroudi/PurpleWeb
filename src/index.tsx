import React from "react";
import { StyleSheet, View } from "react-native";
import createNavigator from "./navigation";
import { NavigationContainer } from "@react-navigation/native";
import { Calendar } from "./components/calendar";
import { Gallery } from "./components/gallery";

const Navigator = createNavigator();

export const App = () => {
  return (
    <NavigationContainer>
      <View style={stylesheet.container}>
        <Navigator.Navigator>
          <Navigator.Screen name="Gallery" component={Gallery} />
          <Navigator.Screen name="Calendar" component={Calendar} />
        </Navigator.Navigator>
      </View>
    </NavigationContainer>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});
