/** @type {import('tailwindcss').Config} */

//Read custom-color value in theme daisy config
function formatColorValue(variable) {
    return `var(${variable})`;
}

module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                "custom-color": formatColorValue("--custom-color"),
            },
        },
    },
    daisyui: {
        themes: [
            {
                // mytheme: {
                //     primary: "#b839db",

                //     secondary: "#bbc621",

                //     accent: "#3ffc6e",

                //     neutral: "#241424",

                //     "base-100": "#343437",

                //     info: "#3F9ACA",

                //     success: "#13AA96",

                //     warning: "#F6D265",

                //     error: "#F56B79",

                //     "--custom-color": "#c07eec",
                // },
                light: {
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=light]"
                    ],
                    "--custom-color": "#696",
                    accent: "#1ed760",
                },
                dracula: {
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=dracula]"
                    ],
                    "--custom-color": "#696",
                    neutral: "#717793",
                    accent: "#1ed760",
                },
                night: {
                    ...require("daisyui/src/colors/themes")[
                        "[data-theme=night]"
                    ],
                    "--custom-color": "#696",
                    neutral: "#637591",
                    accent: "#1ed760",
                },
            },
        ],
    },
    plugins: [require("daisyui")],
};
