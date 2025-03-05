import daisyui from "daisyui";
/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#22594A", // dark green
                secondary: "#733E1F", // dark brown
                accent: "#BF7839", // light brown
                light: "#F2F2F2", // almost white
                dark: "#262626", // almost black
            },
            fontFamily: {
                heading: ["Playfair Display", "serif"], // Für Überschriften
                body: ["Inter", "sans-serif"], // Für Fließtext
            },
            keyframes: {
                softBounce: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(15px)" }, // Kleinerer Sprung
                },
            },
            animation: {
                "soft-bounce": "softBounce 1.5s infinite ease-in-out",
            },
        },
    },
    plugins: [daisyui],
};
