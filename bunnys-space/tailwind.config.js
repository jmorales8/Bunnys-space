/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        font1: "var(--font-1)",
        font2: "var(--font-2)",
        linkfont: "var(--link-font)",
        bgmain: "var(--bg-main)",
        bg1: "var(--bg-1)",
        bg2: "var(--bg-2)",
        bg3: "var(--bg-3)",
        bg4: "var(--bg-4)",
        bg5: "var(--bg-5)",
        bg6: "var(--bg-6)",
        bg7: "var(--bg-7)",
        bg8: "var(--bg-8)",
        bg9: "var(--bg-9)",
        bg10: "var(--bg-10)",
        bg11: "var(--bg-11)",
        bg12: "var(--bg-12)",
        bg13: "var(--bg-13)",
        bg14: "var(--bg-14)",
        bg15: "var(--bg-15)",
        bg16: "var(--bg-16)",
        bg17: "var(--bg-17)",
      },
    },
  },
  plugins: [],
};
