import { MAX_PAGES } from "../../types";

export interface SplitOptions {
    linesPerPage: number;
    usableWidth: number;
    fontFamily: string;
    fontSize: number;
    /** Overrides the canvas measurer. Used by tests to get deterministic widths. */
    measure?: (s: string) => number;
}

export interface SplitResult {
    pages: string[];
    /** True when the text needed more than MAX_PAGES and the tail was dropped. */
    truncated: boolean;
}

/**
 * Wraps text into lines that fit the paper, then deals those lines onto pages.
 *
 * Every line handed to a page already fits the usable width, so CSS never
 * re-wraps it and each page holds exactly linesPerPage lines. Manual newlines
 * are preserved, including blank ones.
 *
 * The earlier version pushed a whole paragraph into one slot and padded with
 * placeholders to budget its wrapped height, which left page one overflowing
 * and every later page empty.
 */
export function splitTextIntoPages(text: string, options: SplitOptions): SplitResult {
    if (!text.trim()) return { pages: [""], truncated: false };

    const { linesPerPage, usableWidth, fontFamily, fontSize } = options;
    const measure = options.measure ?? createTextMeasurer(fontFamily, fontSize);
    const maxLines = linesPerPage * MAX_PAGES;

    const visualLines: string[] = [];
    let truncated = false;

    for (const rawLine of text.split("\n")) {
        for (const wrapped of wrapLine(rawLine, measure, usableWidth)) {
            if (visualLines.length >= maxLines) {
                truncated = true;
                break;
            }
            visualLines.push(wrapped);
        }
        if (truncated) break;
    }

    const pages: string[] = [];
    for (let i = 0; i < visualLines.length; i += linesPerPage) {
        pages.push(visualLines.slice(i, i + linesPerPage).join("\n"));
    }

    return { pages: pages.length > 0 ? pages : [""], truncated };
}

/**
 * Greedily packs words onto lines no wider than maxWidth. A single word too
 * long to fit on its own is broken by character, matching the CSS
 * `word-break: break-word` the paper falls back to.
 */
export function wrapLine(line: string, measure: (s: string) => number, maxWidth: number): string[] {
    if (line === "") return [""]; // a blank line the user typed deliberately

    const spaceWidth = measure(" ");
    const lines: string[] = [];
    let current: string[] = [];
    let currentWidth = 0;

    const flush = () => {
        if (current.length) lines.push(current.join(" "));
        current = [];
        currentWidth = 0;
    };

    for (const word of line.split(" ")) {
        const wordWidth = measure(word);

        if (wordWidth > maxWidth) {
            flush();
            let chunk = "";
            let chunkWidth = 0;
            // Iterating the string (not indexing) keeps emoji and accents intact.
            for (const char of word) {
                const charWidth = measure(char);
                if (chunk && chunkWidth + charWidth > maxWidth) {
                    lines.push(chunk);
                    chunk = "";
                    chunkWidth = 0;
                }
                chunk += char;
                chunkWidth += charWidth;
            }
            if (chunk) {
                current = [chunk];
                currentWidth = chunkWidth;
            }
            continue;
        }

        const added = current.length ? spaceWidth + wordWidth : wordWidth;
        if (current.length && currentWidth + added > maxWidth) {
            flush();
            current = [word];
            currentWidth = wordWidth;
        } else {
            current.push(word);
            currentWidth += added;
        }
    }

    flush();
    return lines.length > 0 ? lines : [""];
}

/**
 * Measures strings in the font the paper actually renders with, caching by
 * string since real text repeats words heavily.
 *
 * Falls back to a rough per-character width when there is no canvas, which only
 * happens during SSR — the editor always starts empty, so that path never
 * paginates real text.
 */
export function createTextMeasurer(fontFamily: string, fontSize: number): (s: string) => number {
    const context =
        typeof document !== "undefined" ? document.createElement("canvas").getContext("2d") : null;

    if (!context) {
        const avgCharWidth = fontSize * 0.38;
        return (s) => s.length * avgCharWidth;
    }

    context.font = `${fontSize}px "${fontFamily}", cursive`;
    const cache = new Map<string, number>();

    return (s) => {
        const cached = cache.get(s);
        if (cached !== undefined) return cached;
        const width = context.measureText(s).width;
        cache.set(s, width);
        return width;
    };
}
