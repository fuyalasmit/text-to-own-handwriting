"use client";

import { useCallback, useRef } from "react";
import { fontFileToBase64, injectFontFace, fetchFontAsBase64 } from "../utils/fontToBase64";
import { BUILT_IN_FONTS, type BuiltInFont } from "../types";

/**
 * Manages font loading for both built-in and custom fonts.
 * Ensures fonts are injected as base64 @font-face rules so
 * html-to-image can capture them correctly during export.
 */
export function useFontLoader() {
    // Track which built-in fonts have already been injected
    const injectedBuiltIns = useRef<Set<string>>(new Set());

    /**
     * Ensure a built-in font is injected as base64.
     * Fetches from /public/fonts only once per font.
     */
    const ensureBuiltInFont = useCallback(async (fontId: BuiltInFont) => {
        if (injectedBuiltIns.current.has(fontId)) return;

        const meta = BUILT_IN_FONTS.find((f) => f.id === fontId);
        if (!meta) return;

        try {
            const base64 = await fetchFontAsBase64(meta.fileName);
            injectFontFace(fontId, base64);
            injectedBuiltIns.current.add(fontId);
        } catch (err) {
            console.warn(`Could not inject font ${fontId} as base64:`, err);
            // Non-fatal — CSS @font-face in globals.css is still the fallback
        }
    }, []);

    /**
     * Load a user-uploaded font file, convert to base64, inject @font-face,
     * and return the font name and base64 URI for state storage.
     */
    const loadCustomFont = useCallback(async (file: File): Promise<{ fontName: string; base64: string }> => {
        // Derive a safe CSS font-family name from the file name
        const fontName =
            "custom-hw-" +
            file.name
                .replace(/\.[^/.]+$/, "")
                .replace(/\s+/g, "-")
                .toLowerCase();
        const base64 = await fontFileToBase64(file);
        injectFontFace(fontName, base64);
        return { fontName, base64 };
    }, []);

    return { ensureBuiltInFont, loadCustomFont };
}
