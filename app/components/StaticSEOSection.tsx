import { faqs } from "../content/faqs";

const CONVERT_STEPS = [
    "Type or paste your text into the box in the sidebar. The paper preview updates as you type and splits into pages automatically.",
    "Pick one of the five built-in handwriting styles, or upload a font made from your own writing.",
    "Set the font size, choose an ink color, and turn the ruled lines or left margin on or off.",
    "Save a single page as a PNG image, or export every page together as one A4 PDF.",
];

const OWN_HANDWRITING_STEPS = [
    "Open calligraphr.com and download their blank character template.",
    "Write each letter, number, and punctuation mark into the boxes with a pen you normally use.",
    "Scan or photograph the finished sheet and upload it back to Calligraphr.",
    "Download the .ttf font file it generates for you.",
    'Come back here, click "Upload your font" in the Handwriting Style panel, and select that file.',
];

const CUSTOMIZATION: [string, string][] = [
    ["Handwriting style", "Five built-in styles, or any .ttf, .otf, .woff, or .woff2 font you upload."],
    ["Font size", "A slider from 14px to 48px, with the page count adjusting live as you change it."],
    [
        "Ink color",
        "Black, dark blue, navy, dark green, and burgundy presets, plus a picker for any custom shade.",
    ],
    ["Ruled lines", "Horizontal notebook lines that can be switched off for plain paper."],
    ["Margin line", "The red left margin found on school exercise books, also optional."],
    ["Pages", "Text flows across up to 10 A4 pages automatically — no manual page breaks needed."],
];

const USE_CASES = [
    "Assignments, notes, and practice sheets that need to look handwritten rather than typed.",
    "Personal letters, thank-you notes, and cards where typed text feels too impersonal.",
    "Journal and diary pages, or filling a notebook layout with text you already drafted digitally.",
    "Worksheets and teaching material where a handwritten example reads more naturally than a printed one.",
    "Mockups and design work that need realistic handwritten filler on paper.",
];

export default function StaticSEOSection() {
    return (
        <section
            aria-label="About this tool"
            style={{
                borderTop: "1px solid var(--border)",
                padding: "56px 20px 80px",
            }}>
            <div
                style={{
                    maxWidth: 720,
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 48,
                }}>
                {/* Intro */}
                <div>
                    <Heading size={20}>Text to Handwriting Converter</Heading>
                    <Para>
                        This is a free online tool that turns typed text into handwriting on a page of A4
                        paper. Type or paste whatever you need, choose a handwriting style, and download the
                        result as a PNG image or a multi-page PDF. There is no signup, no watermark, and no
                        limit on how much you convert.
                    </Para>
                    <Para>
                        Most converters only offer a fixed set of generic handwriting fonts, which is why
                        their output tends to look the same for everyone. This one also lets you upload a font
                        built from your <em>own</em> handwriting, so the finished page is written in your
                        actual letterforms rather than a stock typeface.
                    </Para>
                </div>

                {/* How it works */}
                <div>
                    <Heading>How to convert text to handwriting</Heading>
                    <NumberedList items={CONVERT_STEPS} />
                </div>

                {/* Own handwriting */}
                <div>
                    <Heading>How to use your own handwriting</Heading>
                    <Para>
                        The tool renders whatever font you give it, so using your real handwriting is a matter
                        of turning your writing into a font file once. Calligraphr does that part for free,
                        and the whole process takes around twenty minutes:
                    </Para>
                    <NumberedList items={OWN_HANDWRITING_STEPS} />
                    <Para>
                        From then on, every page you generate is in your own handwriting. The font stays
                        selected while the tab is open, so you only do this once per device.
                    </Para>
                </div>

                {/* Customization */}
                <div>
                    <Heading>What you can customize</Heading>
                    <dl style={{ margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                        {CUSTOMIZATION.map(([term, detail]) => (
                            <div key={term} style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                                <dt style={{ fontSize: 13, fontWeight: 600, color: "var(--text-primary)" }}>
                                    {term}
                                </dt>
                                <dd
                                    style={{
                                        margin: 0,
                                        fontSize: 13,
                                        color: "var(--text-secondary)",
                                        lineHeight: 1.7,
                                    }}>
                                    {detail}
                                </dd>
                            </div>
                        ))}
                    </dl>
                </div>

                {/* Use cases */}
                <div>
                    <Heading>What people use it for</Heading>
                    <BulletList items={USE_CASES} />
                </div>

                {/* Privacy */}
                <div>
                    <Heading>Your text and fonts stay on your device</Heading>
                    <Para>
                        Everything runs inside your browser. When you upload a font, the file is read locally
                        and used to draw the page right there on your screen — it is never sent to a server,
                        never stored, and never seen by anyone else. The same is true of the text you type and
                        the PNG and PDF files you export, which are generated on your own machine.
                    </Para>
                    <Para>
                        That also means the tool keeps working with a patchy connection once the page has
                        loaded, and there is no account holding on to anything you wrote.
                    </Para>
                </div>

                {/* FAQ */}
                <div>
                    <Heading>Frequently asked questions</Heading>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            border: "1px solid var(--border)",
                            borderRadius: 10,
                            overflow: "hidden",
                        }}>
                        {faqs.map(({ q, a }, i) => (
                            <div
                                key={q}
                                style={{
                                    padding: "16px 20px",
                                    borderBottom: i < faqs.length - 1 ? "1px solid var(--border)" : "none",
                                }}>
                                <h3
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: "var(--text-primary)",
                                        margin: "0 0 6px 0",
                                    }}>
                                    {q}
                                </h3>
                                <p
                                    style={{
                                        fontSize: 13,
                                        color: "var(--text-secondary)",
                                        lineHeight: 1.7,
                                        margin: 0,
                                    }}>
                                    {a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

// ─── Sub-components ────────────────────────────────────────────────────────

function Heading({ children, size = 16 }: { children: React.ReactNode; size?: number }) {
    return (
        <h2
            style={{
                fontSize: size,
                fontWeight: size >= 20 ? 700 : 600,
                color: "var(--text-primary)",
                margin: "0 0 12px 0",
                letterSpacing: size >= 20 ? "-0.02em" : "-0.01em",
            }}>
            {children}
        </h2>
    );
}

function Para({ children }: { children: React.ReactNode }) {
    return (
        <p
            style={{
                fontSize: 14,
                color: "var(--text-secondary)",
                lineHeight: 1.8,
                margin: "0 0 12px 0",
            }}>
            {children}
        </p>
    );
}

function NumberedList({ items }: { items: string[] }) {
    return (
        <ol
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
            }}>
            {items.map((step, i) => (
                <li key={i} style={LIST_ITEM_STYLE}>
                    <span
                        style={{
                            fontSize: 11,
                            fontWeight: 700,
                            color: "var(--accent)",
                            minWidth: 18,
                            paddingTop: 1,
                        }}>
                        {i + 1}.
                    </span>
                    {step}
                </li>
            ))}
        </ol>
    );
}

function BulletList({ items }: { items: string[] }) {
    return (
        <ul
            style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: 12,
            }}>
            {items.map((item, i) => (
                <li key={i} style={LIST_ITEM_STYLE}>
                    <span style={{ color: "var(--accent)", fontWeight: 700, minWidth: 18 }}>—</span>
                    {item}
                </li>
            ))}
        </ul>
    );
}

const LIST_ITEM_STYLE: React.CSSProperties = {
    fontSize: 14,
    color: "var(--text-secondary)",
    lineHeight: 1.7,
    display: "flex",
    alignItems: "baseline",
    gap: 10,
};
