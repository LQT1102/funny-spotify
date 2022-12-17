import { changeCurrentTheme, getCurrentTheme } from "@/src/utils/theme";
import React, { useEffect, useState } from "react";

export interface IThemeSettingProps {}

export default function ThemeSetting() {
    const [currentTheme, setCurrentTheme] = useState("");

    useEffect(() => {
        const theme = getCurrentTheme() || "";
        console.log(theme);
        setCurrentTheme(theme);
    }, []);

    return (
        <>
            <select
                className="gradientselect"
                data-choose-theme
                value={currentTheme}
                onChange={(e) => {
                    changeCurrentTheme(e.target.value);
                    setCurrentTheme(e.target.value);
                }}
            >
                <option disabled value="-">
                    Pick a theme
                </option>
                <option value="light">Light</option>
                <option value="dracula">Dracula</option>
                <option value="night">Night</option>
            </select>
            <div className="mx-4 font-bold inline-block text-custom-color">
                Custom color
            </div>
            <button
                className="btn mx-4"
                onClick={() => changeCurrentTheme("light")}
            >
                Change current theme to light
            </button>
        </>
    );
}
