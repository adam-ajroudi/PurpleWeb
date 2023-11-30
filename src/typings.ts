export interface ArtPiece {
    id: number;
    title: string;
    artist: string;
    year: number;
    image: string;
    description: string;
}

export const enum BlockType {
    TallRight = "TallRight",
    TallLeft = "TallLeft",
    MidLeft = "MidLeft",
    MidRight = "MidRight",
    Wide = "Wide",
}
