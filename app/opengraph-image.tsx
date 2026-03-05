import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Text to Own Handwriting — Convert Text to Realistic Handwriting";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#F0EBE1",
                padding: "60px 80px",
                position: "relative",
            }}>
            {/* Ruled lines decoration */}
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
                <div
                    key={i}
                    style={{
                        position: "absolute",
                        left: 0,
                        right: 0,
                        top: `${120 + i * 72}px`,
                        height: "1px",
                        backgroundColor: "#C8D8E8",
                    }}
                />
            ))}
            {/* Margin line */}
            <div
                style={{
                    position: "absolute",
                    top: 0,
                    bottom: 0,
                    left: "140px",
                    width: "2px",
                    backgroundColor: "#F4A3A3",
                }}
            />

            {/* Content */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "24px",
                    zIndex: 1,
                }}>
                <p
                    style={{
                        fontSize: "72px",
                        fontWeight: 700,
                        color: "#1C1816",
                        margin: 0,
                        textAlign: "center",
                        letterSpacing: "-1px",
                    }}>
                    Text to Own Handwriting
                </p>
                <p
                    style={{
                        fontSize: "28px",
                        color: "#5C4F3A",
                        margin: 0,
                        textAlign: "center",
                    }}>
                    Convert your typed text into realistic handwriting
                </p>
                <div
                    style={{
                        display: "flex",
                        gap: "16px",
                        marginTop: "12px",
                    }}>
                    {["PNG Export", "PDF Export", "Custom Fonts", "Free"].map((tag) => (
                        <div
                            key={tag}
                            style={{
                                padding: "8px 20px",
                                backgroundColor: "#2D6A4F",
                                color: "#fff",
                                borderRadius: "999px",
                                fontSize: "20px",
                                fontWeight: 600,
                            }}>
                            {tag}
                        </div>
                    ))}
                </div>
                <p
                    style={{
                        fontSize: "22px",
                        color: "#8C7B68",
                        margin: 0,
                    }}>
                    texttohandwriting.asmitphuyal.com.np
                </p>
            </div>
        </div>,
        { ...size },
    );
}
