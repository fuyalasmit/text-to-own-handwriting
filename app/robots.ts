import type { MetadataRoute } from "next";

const BASE_URL = "https://texttohandwriting.asmitphuyal.com.np";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: "*",
            allow: "/",
        },
        sitemap: `${BASE_URL}/sitemap.xml`,
    };
}
