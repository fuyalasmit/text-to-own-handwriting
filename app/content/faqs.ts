export interface Faq {
    q: string;
    a: string;
}

/**
 * Shared between the on-page FAQ block and the FAQPage JSON-LD in layout.tsx.
 * Answers are written to stand alone — search engines and AI assistants quote
 * them out of context, so each one repeats enough of the question to make sense
 * on its own.
 */
export const faqs: Faq[] = [
    {
        q: "Can I convert text into my own handwriting?",
        a: "Yes. Create a font from your real handwriting at calligraphr.com — you print a template, fill in each letter by hand, scan it, and download the result as a .ttf file. Upload that file here and every character you type is rendered in your actual handwriting.",
    },
    {
        q: "How do I make a font from my handwriting?",
        a: "Go to calligraphr.com and download their character template. Write each letter, number, and punctuation mark in the boxes using a pen. Scan or photograph the sheet, upload it back to Calligraphr, and it generates a .ttf font file. That whole process takes about 20 minutes and their free tier is enough for a basic alphabet.",
    },
    {
        q: "Is this text to handwriting converter free?",
        a: "Yes, completely. There is no signup, no account, no watermark on exports, and no limit on how many PNG or PDF files you generate. Every feature including custom font upload is free.",
    },
    {
        q: "Is my uploaded font sent to a server?",
        a: "No. Your font file is read directly in your browser and never leaves your device. There is no upload, no server-side processing, and no storage — the text you type is not transmitted anywhere either. Everything happens locally on your computer or phone.",
    },
    {
        q: "What font file formats can I upload?",
        a: "TrueType (.ttf) works best and is what Calligraphr produces. OpenType (.otf), .woff, and .woff2 files are also accepted.",
    },
    {
        q: "Does the output look like real handwriting?",
        a: "Text is rendered on an A4 paper canvas with ruled lines and a red left margin, so it reads as a notebook page rather than a screenshot. The built-in styles look handwritten but repeat the same shape for each letter. Uploading a font made from your own writing is what makes it genuinely convincing.",
    },
    {
        q: "What can I export and in what format?",
        a: "Each page can be saved as a PNG image at 2× resolution for sharp output. You can also export every page together as a single multi-page A4 PDF, which is the right choice for anything you intend to print or submit as one document.",
    },
    {
        q: "How many pages can I create at once?",
        a: "Your text is split across pages automatically as you type, up to 10 A4 pages. The page count updates live in the sidebar so you can see how long the finished document will be.",
    },
    {
        q: "Can I change the ink color and the paper style?",
        a: "Yes. There are five ink presets — black, dark blue, navy, dark green, and burgundy — plus a color picker for any custom shade. The ruled horizontal lines and the left margin line can each be toggled off independently if you want plain paper.",
    },
    {
        q: "Can I adjust the handwriting size?",
        a: "Yes, the font size slider runs from 14px to 48px. Larger sizes fit fewer lines per page, and the page count adjusts automatically as you change it.",
    },
    {
        q: "Does it work on a phone?",
        a: "Yes. The layout adapts to small screens, with the controls stacking below the paper preview. Exporting to PNG and PDF works on mobile browsers too.",
    },
    {
        q: "Do I need to install anything or create an account?",
        a: "No. It runs entirely in your web browser with no download, no extension, and no signup. Open the page and start typing.",
    },
    {
        q: "Can I use this for school or college assignments?",
        a: "The tool is often used for handwritten-style notes, assignments, and practice sheets. Whether a generated document is acceptable for submission depends on your school or university's own policy, so check their rules before turning in work that was meant to be handwritten by hand.",
    },
    {
        q: "Why is my text overflowing or breaking oddly?",
        a: "Very long words without spaces cannot be wrapped, and a large font size reduces how much fits per line. Lowering the font size or adding line breaks in your text usually fixes it. Text beyond 10 pages is not rendered.",
    },
];
