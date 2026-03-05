export type BuiltInFont = "handwriting1" | "handwriting2" | "handwriting3" | "handwriting4" | "handwriting5";

export type FontOption = BuiltInFont | "custom";

export interface EditorState {
    text: string;
    fontSize: number;
    inkColor: string;
    showLines: boolean;
    showMargin: boolean;
    selectedFont: FontOption;
    customFontName: string | null;
    customFontBase64: string | null;
}

export interface BuiltInFontMeta {
    id: BuiltInFont;
    label: string;
    fileName: string;
}

export const BUILT_IN_FONTS: BuiltInFontMeta[] = [
    { id: "handwriting1", label: "Handwriting 1", fileName: "handwriting1.ttf" },
    { id: "handwriting2", label: "Handwriting 2", fileName: "handwriting2.ttf" },
    { id: "handwriting3", label: "Handwriting 3", fileName: "handwriting3.ttf" },
    { id: "handwriting4", label: "Handwriting 4", fileName: "handwriting4.ttf" },
    { id: "handwriting5", label: "Handwriting 5", fileName: "handwriting5.ttf" },
];

// A4 at 96dpi
export const A4_WIDTH_PX = 794;
export const A4_HEIGHT_PX = 1123;

// How many pages are shown
export const MAX_PAGES = 10;
