import type { Config } from "tailwindcss";

// Tailwind v4 uses CSS-based design tokens via @theme in globals.css
// This config extends the CSS tokens for use as Tailwind utilities

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ─── Typography Scale (h1-h6 + body system) ───────────────────────────
      fontSize: {
        "xs": ["var(--text-xs)", { lineHeight: "var(--leading-xs)" }],
        "sm": ["var(--text-sm)", { lineHeight: "var(--leading-sm)" }],
        "base": ["var(--text-base)", { lineHeight: "var(--leading-base)" }],
        "lg": ["var(--text-lg)", { lineHeight: "var(--leading-lg)" }],
        "xl": ["var(--text-xl)", { lineHeight: "var(--leading-xl)" }],
        "2xl": ["var(--text-2xl)", { lineHeight: "var(--leading-2xl)" }],
        "3xl": ["var(--text-3xl)", { lineHeight: "var(--leading-3xl)" }],
        "4xl": ["var(--text-4xl)", { lineHeight: "var(--leading-4xl)" }],
        "5xl": ["var(--text-5xl)", { lineHeight: "var(--leading-5xl)" }],
        "6xl": ["var(--text-6xl)", { lineHeight: "var(--leading-6xl)" }],
      },
    },
  },
};

export default config;