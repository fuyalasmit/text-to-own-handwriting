export default function StaticSEOSection() {
    const faqs = [
        {
            q: "Can I use my own handwriting?",
            a: "Yes. Create a font from your handwriting using calligraphr.com, then upload the .ttf file. The tool will use your own handwriting to render the text.",
        },
        {
            q: "Is it free?",
            a: "Yes. No signup, no watermark, no limits. Export as many PNG or PDF files as you want.",
        },
        {
            q: "Does it look realistic?",
            a: "It renders text on a ruled paper canvas with a red margin line. It looks like a handwritten notebook page. Upload your own font to make it look exactly like your handwriting.",
        },
        {
            q: "What can I export?",
            a: "Each page can be saved as a PNG image. You can also export everything as a single PDF with multiple pages.",
        },
    ];

    return (
        <section
            aria-label="About this tool"
            style={{
                borderTop: "1px solid var(--border)",
                padding: "56px 20px 80px",
                textAlign: "center",
            }}>
            <div
                style={{
                    maxWidth: 600,
                    margin: "0 auto",
                    display: "flex",
                    flexDirection: "column",
                    gap: 48,
                }}>
                {/* Intro */}
                <div>
                    <h2
                        style={{
                            fontSize: 20,
                            fontWeight: 700,
                            color: "var(--text-primary)",
                            marginBottom: 10,
                            letterSpacing: "-0.02em",
                        }}>
                        Text to Handwriting Converter
                    </h2>
                    <p style={{ fontSize: 14, color: "var(--text-secondary)", lineHeight: 1.8, margin: 0 }}>
                        Type any text and it turns into handwriting on a ruled paper page. Pick a style, adjust the size
                        and ink color, then download as PNG or PDF. Free, no signup, no watermark.
                    </p>
                </div>

                {/* How it works */}
                <div>
                    <h2
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: 20,
                            letterSpacing: "-0.01em",
                        }}>
                        How it works
                    </h2>
                    <ol
                        style={{
                            listStyle: "none",
                            padding: 0,
                            margin: 0,
                            display: "flex",
                            flexDirection: "column",
                            gap: 12,
                        }}>
                        {[
                            "Paste or type your text in the sidebar.",
                            "Pick a handwriting style, or upload your own .ttf font.",
                            "Adjust font size, ink color, lines, and margin.",
                            "Save as PNG or PDF.",
                        ].map((step, i) => (
                            <li
                                key={i}
                                style={{
                                    fontSize: 14,
                                    color: "var(--text-secondary)",
                                    lineHeight: 1.6,
                                    display: "flex",
                                    alignItems: "baseline",
                                    gap: 10,
                                    textAlign: "left",
                                }}>
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
                </div>

                {/* FAQ */}
                <div>
                    <h2
                        style={{
                            fontSize: 16,
                            fontWeight: 600,
                            color: "var(--text-primary)",
                            marginBottom: 24,
                            letterSpacing: "-0.01em",
                        }}>
                        FAQs
                    </h2>
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 0,
                            textAlign: "left",
                            border: "1px solid var(--border)",
                            borderRadius: 10,
                            overflow: "hidden",
                        }}>
                        {faqs.map(({ q, a }, i) => (
                            <div
                                key={i}
                                style={{
                                    padding: "16px 20px",
                                    borderBottom: i < faqs.length - 1 ? "1px solid var(--border)" : "none",
                                }}>
                                <p
                                    style={{
                                        fontSize: 14,
                                        fontWeight: 600,
                                        color: "var(--text-primary)",
                                        margin: "0 0 6px 0",
                                    }}>
                                    {q}
                                </p>
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
