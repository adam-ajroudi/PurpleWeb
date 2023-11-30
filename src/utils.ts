import { ArtPiece, BlockType } from "./typings";

const endpoint =
    "https://script.google.com/macros/s/AKfycbzOvv0hhKGaK6SWe3Yqo9f9gvgsE8xMJ6wjMA_I5sKaTdc5U3VwKTPPU-96HFBTf1Ky/exec";

const spreadsheetId = "1o8_I1ikXb7nEUemz71xVGCIpPcVMFmLy1VnRnuiSBvA";
const sheetName = "Test";

const headers = ["id", "title", "artist", "year", "image", "description"];

export const sizes: Record<BlockType, number> = {
    [BlockType.TallRight]: 5,
    [BlockType.TallLeft]: 5,
    [BlockType.MidRight]: 3,
    [BlockType.MidLeft]: 3,
    [BlockType.Wide]: 1,
};

export const blockTypes = [
    BlockType.TallRight,
    BlockType.TallLeft,
    BlockType.MidRight,
    BlockType.MidLeft,
    BlockType.Wide,
];

export const format = <T,>(data: any[]): T =>
    Object.fromEntries(headers.map((header, i) => [header, data[i]])) as T;

export const get = async (): Promise<ArtPiece[]> => {
    const parameters = {
        spreadsheetId,
        sheetName,
    };
    const query = new URLSearchParams(parameters);
    const url = `${endpoint}?${query}`;
    const response = await fetch(url);

    const { values } = await response.json();
    const formatted = values.slice(1).map(format);

    return formatted;
};
