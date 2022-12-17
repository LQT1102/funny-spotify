import dynamic from "next/dynamic";

const ThemeSettingWithNoSSR = dynamic(() => import("./index"), {
    ssr: false,
});

export default ThemeSettingWithNoSSR;
