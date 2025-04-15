// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,js,html}"
  ],
  darkMode: "class",
  theme: {
    extend: {
      // Custom colors for your dreamboard
      colors: {
        primary: "#8b5cf6",
        secondary: "#6366f1",
        accent: "#ec4899",
        background: {
          light: "#f8fafc",
          dark: "#0f172a"
        }
      }
    }
  },
  plugins: []
}