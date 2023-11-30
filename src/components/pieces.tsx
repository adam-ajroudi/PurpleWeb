import React, { FC, useCallback } from "react";
import { View, Image, Pressable } from "react-native";
import { ArtPiece } from "../typings";
import { useNavigation } from "@react-navigation/native";

export interface PieceProps {
  piece: ArtPiece;
}

export const Square: FC<PieceProps> = ({ piece }) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    // @ts-ignore
    navigation.push("Piece View", { piece });
  }, [navigation, piece]);

  return (
    <Pressable
      style={{
        aspectRatio: 1,
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: piece.image }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
    </Pressable>
  );
};

export const Tall: FC<PieceProps> = ({ piece }) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    // @ts-ignore
    navigation.push("Piece View", { piece });
  }, [navigation, piece]);

  return (
    <Pressable
      style={{
        height: "100%",
        // backgroundColor: "red",
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: piece.image }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          resizeMode: "stretch",
        }}
      />
    </Pressable>
  );
};

export const Wide: FC<PieceProps> = ({ piece }) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    // @ts-ignore
    navigation.push("Piece View", { piece });
  }, [navigation, piece]);

  return (
    <Pressable
      style={{
        width: "100%",
        aspectRatio: 2,
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: piece.image }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
    </Pressable>
  );
};

export const Fill: FC<PieceProps> = ({ piece }) => {
  const navigation = useNavigation();

  const onPress = useCallback(() => {
    // @ts-ignore
    navigation.push("Piece View", { piece });
  }, [navigation, piece]);

  return (
    <Pressable
      style={{
        width: "100%",
        height: "100%",
      }}
      onPress={onPress}
    >
      <Image
        source={{ uri: piece.image }}
        style={{
          flex: 1,
          width: "100%",
          height: "100%",
          resizeMode: "cover",
        }}
      />
    </Pressable>
  );
};
