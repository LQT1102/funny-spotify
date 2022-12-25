import { NextPageWithLayout } from "@/src/commons/types";
import ThemeSettingWithNoSSR from "@/src/components/base/ThemeSetting/ThemeSettingWithNoSSR";
import { PublicSiteLayout } from "@/src/components/layout/siteLayout";
import { NextPage } from "next";
import Head from "next/head";
import PlaylistContextProvider from "../contexts/PlaylistContext";
import useTranslations from "../utils/translation";

export interface ISwapPageProps {}

const Index: NextPageWithLayout = (props: any) => {
    const t = useTranslations();

    return (
        <div>
            <Head>
                <title>Funny spotify</title>
                <link rel="shortcut icon" href="/assets/favicon.png" />
            </Head>
            {t("hello", { name: "world" })} <ThemeSettingWithNoSSR />
        </div>
    );
};

Index.Layout = PublicSiteLayout;

export default Index;
