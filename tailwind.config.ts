import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Instrument Serif"', "serif"],
        gothic: ['"UnifrakturCook"', "serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
