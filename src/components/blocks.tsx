import React, { FC } from "react";
import { ListRenderItem, View } from "react-native";
import { ArtPiece, BlockType } from "../typings";
import { Item } from "./gallery";
import { Fill, Square, Tall, Wide } from "./pieces";

export interface BlockProps {
  pieces: ArtPiece[];
}

export const BlockTallRight: FC<BlockProps> = ({ pieces }) => {
  const [a, b, c, d, e] = pieces;

  return (
    <View
      style={{
        flex: 3,
        flexDirection: "row",
        width: "100%",
        gap: 5,
        marginBottom: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Square piece={a} />
        {b && <Square piece={b} />}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 5,
        }}
      >
        {c && <Square piece={c} />}
        {d && <Square piece={d} />}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 5,
        }}
      >
        {e && <Tall piece={e} />}
      </View>
    </View>
  );
};

export const BlockTallLeft: FC<BlockProps> = ({ pieces }) => {
  const [a, b, c, d, e] = pieces;

  return (
    <View
      style={{
        flex: 3,
        flexDirection: "row",
        width: "100%",
        gap: 5,
        marginBottom: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Tall piece={a} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 5,
        }}
      >
        {b && <Square piece={b} />}
        {c && <Square piece={c} />}
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 5,
        }}
      >
        {d && <Square piece={d} />}
        {e && <Square piece={e} />}
      </View>
    </View>
  );
};

export const BlockWide: FC<BlockProps> = ({ pieces }) => {
  const [a] = pieces;
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        width: "100%",
        gap: 5,
        marginBottom: 5,
      }}
    >
      <Wide piece={a} />
    </View>
  );
};

export const BlockMidLeft: FC<BlockProps> = ({ pieces }) => {
  const [a, b, c] = pieces;

  return (
    <View
      style={{
        flex: 3,
        flexDirection: "row",
        width: "100%",
        gap: 5,
        marginBottom: 5,
      }}
    >
      <View
        style={{
          flex: 2,
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Fill piece={a} />
      </View>
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 5,
        }}
      >
        {b && <Square piece={b} />}
        {c && <Square piece={c} />}
      </View>
    </View>
  );
};

export const BlockMidRight: FC<BlockProps> = ({ pieces }) => {
  const [a, b, c] = pieces;

  return (
    <View
      style={{
        flex: 3,
        flexDirection: "row",
        width: "100%",
        gap: 5,
        marginBottom: 5,
      }}
    >
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          gap: 5,
        }}
      >
        <Square piece={a} />
        {b && <Square piece={b} />}
      </View>
      <View
        style={{
          flex: 2,
          flexDirection: "column",
          gap: 5,
        }}
      >
        {c && <Fill piece={c} />}
      </View>
    </View>
  );
};

export const typeToBlock: Record<BlockType, FC<BlockProps>> = {
  [BlockType.TallRight]: BlockTallRight,
  [BlockType.TallLeft]: BlockTallLeft,
  [BlockType.MidLeft]: BlockMidLeft,
  [BlockType.MidRight]: BlockMidRight,
  [BlockType.Wide]: BlockWide,
};

export const renderBlock: ListRenderItem<Item> = ({ item }) => {
  const props = {
    pieces: item.pieces,
  };
  const Component = typeToBlock[item.block];
  return <Component {...props} />;
};
