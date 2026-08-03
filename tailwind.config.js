/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        coral: {
          DEFAULT: "var(--coral)",
          soft: "var(--coral-soft)",
          deep: "var(--coral-deep)",
          text: "var(--coral-text)",
        },
        navy: {
          DEFAULT: "var(--navy)",
          2: "var(--navy-2)",
          3: "var(--navy-3)",
        },
        line: {
          DEFAULT: "var(--line)",
          strong: "var(--line-strong)",
        },
        muted: "var(--text-muted)",
      },
      fontFamily: {
        sans: ["Raleway", "Helvetica Neue", "Arial", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
