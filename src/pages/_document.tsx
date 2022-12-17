import STORAGE_KEYS from "@/src/commons/storageKeys";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";

const themeInitializerScript = `
      (function () {
        const currentTheme = window.localStorage.getItem("${STORAGE_KEYS.THEME}") || "dark";
        const el = document.getElementById("root-html");
        if (el) {
          el.setAttribute("data-theme", currentTheme);
        }
      })();
   `;

export default class Document extends NextDocument {
    render() {
        const { locale } = this.props.__NEXT_DATA__;

        const TITLE = "Funny spotify";
        const DESCRIPTION = "";

        return (
            <Html lang={locale} id="root-html">
                <Head>
                    <meta
                        property="og:url"
                        content={`${process.env.APP_URL}`}
                    />
                    <meta property="og:title" content={TITLE} />
                    <meta property="og:description" content={DESCRIPTION} />
                    <meta
                        property="og:image"
                        content={`${process.env.APP_URL}/assets/og-image.jpg`}
                    />
                    <meta property="og:type" content={"website"} />
                    <meta property="og:site_name" content={TITLE} />
                    <meta
                        data-hid="twitter:card"
                        name="twitter:card"
                        content="summary"
                    />
                    <meta name="twitter:title" content={TITLE} />
                    <meta name="twitter:description" content={DESCRIPTION} />
                    {/* <meta property="og:image:width" content={image.width} />
          <meta property="og:image:height" content={image.height} /> */}
                    {/* <meta property="og:site_name" content="YourSiteName" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:site" content="@site" />
          <meta name="twitter:creator" content="@handle" /> */}
                </Head>
                <body>
                    {/* Make Color mode to persists when you refresh the page. */}
                    <Main />
                    <NextScript />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: themeInitializerScript,
                        }}
                    />
                </body>
            </Html>
        );
    }
}
