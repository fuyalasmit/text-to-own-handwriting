/**
 * Reads a File object (uploaded .ttf/.otf) and returns a base64 data URI.
 * This is the fix for the custom font not rendering on html-to-image export —
 * blob: URLs are not accessible by the capture library, but base64 data URIs are.
 */
export function fontFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const result = reader.result as string;
            resolve(result); // already a data URI: "data:font/ttf;base64,..."
        };
        reader.onerror = () => reject(new Error("Failed to read font file"));
        reader.readAsDataURL(file);
    });
}

/**
 * Injects a @font-face rule with a base64 data URI into a <style> tag in <head>.
 * Idempotent: replaces existing tag with same id if called again.
 */
export function injectFontFace(fontName: string, base64DataUri: string): void {
    const styleId = `custom-font-face-${fontName}`;
    const existing = document.getElementById(styleId);
    if (existing) existing.remove();

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
    @font-face {
      font-family: "${fontName}";
      src: url("${base64DataUri}") format("truetype");
      font-display: swap;
    }
  `;
    document.head.appendChild(style);
}

/**
 * Fetches a built-in font from /public/fonts and returns its base64 data URI.
 * Used so html-to-image can capture built-in fonts too (avoids CORS on some hosts).
 */
export async function fetchFontAsBase64(fontFileName: string): Promise<string> {
    const response = await fetch(`/fonts/${fontFileName}`);
    if (!response.ok) throw new Error(`Failed to fetch font: ${fontFileName}`);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = () => reject(new Error("Failed to convert font blob"));
        reader.readAsDataURL(blob);
    });
}
