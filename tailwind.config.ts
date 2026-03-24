import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "transport": "url('/transport1.jpg')",
      },
    },
  },
  plugins: [],
};
export default config;
