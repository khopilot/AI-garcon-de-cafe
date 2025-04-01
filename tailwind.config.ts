import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        gold: "var(--gold)",
        "gold-light": "var(--gold-light)",
        cream: "var(--cream)",
        "dark-wood": "var(--dark-wood)",
      },
      fontFamily: {
        serif: ["Playfair Display", "Georgia", "serif"],
        sans: ["Libre Franklin", "system-ui", "sans-serif"],
      },
      borderRadius: {
        'sm': '2px',
      },
      boxShadow: {
        'elegant': '0 4px 10px rgba(0, 0, 0, 0.03), 0 0 2px rgba(0, 0, 0, 0.06)',
        'menu': '0 8px 30px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
} satisfies Config;
