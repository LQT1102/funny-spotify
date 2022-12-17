import { AppPropsWithLayout } from "@/src/commons/types";
import Head from "next/head";
import { useRouter } from "next/router";
import NextNProgress from "nextjs-progressbar";
import { Fragment } from "react";
import { IntlProvider } from "react-intl";
import { Provider } from "react-redux";
import "../../public/fonts/font.css";
import "../../public/styles/globals.scss";
import MultipleLangWrapper from "../components/base/MultipleLangWrapper";
import store from "../redux/store";

const languages = {
    vi: require("../../public/locales/vi/lang.json"),
    en: require("../../public/locales/en/lang.json"),
} as any;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const Layout = Component.Layout ?? Fragment;
    const router = useRouter();
    const { locale = "en", defaultLocale = "en" } = router;
    const messages = languages[locale];
    return (
        <IntlProvider
            messages={messages}
            locale={locale}
            defaultLocale={defaultLocale}
        >
            <Provider store={store}>
                <MultipleLangWrapper>
                    <Head>
                        <title>Funny spotify</title>
                        <link rel="shortcut icon" href="/assets/favicon.png" />
                    </Head>
                    <NextNProgress
                        color={"#F1AE71"}
                        startPosition={0.3}
                        stopDelayMs={200}
                        height={3}
                        showOnShallow={true}
                    />
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </MultipleLangWrapper>
            </Provider>
        </IntlProvider>
    );
}

export default MyApp;
