import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./app/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
        "./pages/**/*.{ts,tsx}",
        "./layouts/**/*.{ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                milano: {
                    50: "#fff1f0",
                    100: "#ffe0de",
                    200: "#ffc6c3",
                    300: "#ff9f9a",
                    400: "#ff675f",
                    500: "#ff382e",
                    600: "#f4190e",
                    700: "#c11007",
                    800: "#a9130b",
                    900: "#8c1610",
                    950: "#4d0602",
                },
                apple: {
                    50: "#f1fcf3",
                    100: "#dff9e3",
                    200: "#c2f0c8",
                    300: "#91e49e",
                    400: "#5ace6c",
                    500: "#34b349",
                    600: "#2aa63e",
                    700: "#21742f",
                    800: "#1f5c29",
                    900: "#1b4c24",
                    950: "#092a10",
                },
                cielo: {
                    50: "#eef6ff",
                    100: "#d8eaff",
                    200: "#badaff",
                    300: "#8ac4ff",
                    400: "#53a4ff",
                    500: "#2b7eff",
                    600: "#155dfc",
                    700: "#0d46e8",
                    800: "#1239bb",
                    900: "#153693",
                    950: "#122259",
                },
            },
        },
    },
};

export default config;
