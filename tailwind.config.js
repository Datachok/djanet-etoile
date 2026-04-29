/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        sand: {
          50: "#FBF7F0",
          100: "#F5ECDC",
          200: "#EBD9B7",
          300: "#DDC089",
          400: "#CFA45F",
          500: "#B8863F",
          600: "#9A6B30",
          700: "#7A5326",
          800: "#5A3D1D",
          900: "#3D2913",
        },
        ocre: {
          DEFAULT: "#C77B3C",
          light: "#E29A5A",
          dark: "#8C4F22",
        },
        night: {
          DEFAULT: "#1A1410",
          light: "#2B221C",
          deep: "#0E0A07",
        },
        ivory: "#FAF6EE",
      },
      fontFamily: {
        display: ["'Cormorant Garamond'", "serif"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "dune-gradient": "linear-gradient(180deg, #FBF7F0 0%, #F5ECDC 100%)",
        "night-gradient": "linear-gradient(135deg, #1A1410 0%, #3D2913 100%)",
        "sunset-gradient": "linear-gradient(135deg, #C77B3C 0%, #DDC089 50%, #FBF7F0 100%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.8s ease-out forwards",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
