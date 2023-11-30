import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Image, FlatList, StyleSheet, Text, View } from "react-native";
import { ArtPiece, BlockType } from "../typings";
import { blockTypes, get, sizes } from "../utils";
import { renderBlock } from "./blocks";
import { createStackNavigator } from "@react-navigation/stack";
import { useRoute } from "@react-navigation/native";

export interface Item {
  block: BlockType;
  pieces: ArtPiece[];
}

export interface IGalleryContext {
  items: Item[];
}

export interface PieceViewParams {
  piece: ArtPiece;
}

const Stack = createStackNavigator();

const GalleryContext = createContext<IGalleryContext | null>(null);

export const GalleryScreen: FC = () => {
  const { items } = useContext(GalleryContext)!;

  return (
    <View style={stylesheet.container}>
      <View
        style={{
          padding: 10,
          maxWidth: 800,
        }}
      >
        <FlatList data={items} renderItem={renderBlock} />
      </View>
    </View>
  );
};

export const PieceScreen: FC = () => {
  const { params } = useRoute() as { params: PieceViewParams };
  const { title, artist, year, image, description } = params.piece;

  return (
    <View style={stylesheet.container}>
      <View
        style={{
          aspectRatio: 1,
        }}
      >
        <Image
          source={{ uri: image }}
          style={{
            flex: 1,
            width: "100%",
            height: "100%",
            resizeMode: "cover",
          }}
        />
      </View>
      <View>
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
        >
          {title}
        </Text>
        <Text>{artist}</Text>
        <Text>{year}</Text>
        <Text>{description}</Text>
      </View>
    </View>
  );
};

export const Gallery: FC = () => {
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<Item[]>([]);

  const initialize = useCallback(async () => {
    const pieces = await get();
    const shuffledPieces = pieces.sort(() => Math.random() - 0.5);

    const items = [];
    let counter = 0;
    while (counter < shuffledPieces.length) {
      const block = blockTypes[Math.floor(Math.random() * blockTypes.length)];
      const size = sizes[block];

      const pieces = shuffledPieces.slice(counter, counter + size);
      items.push({
        block,
        pieces,
      });

      counter += size;
    }

    setItems(items);
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) return;
    initialize();
  }, [ready, initialize]);

  const context = useMemo(() => ({ items }), [items]);

  if (!ready) return <Text>Loading...</Text>;

  return (
    <GalleryContext.Provider value={context}>
      <Stack.Navigator
        initialRouteName="Gallery View"
        screenOptions={{ headerShown: true }}
      >
        <Stack.Screen name="Gallery View" component={GalleryScreen} />
        <Stack.Screen name="Piece View" component={PieceScreen} />
      </Stack.Navigator>
    </GalleryContext.Provider>
  );
};

const stylesheet = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    overflow: "scroll",
  },
  header: {
    backgroundColor: "purple",
    width: "100%",
    height: 75,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});
