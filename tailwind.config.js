/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0A3D2B",
        accent: "#10B981",
        overdue: "#EF4444",
        almost: "#F59E0B",
        ontrack: "#10B981",
      }
    },
  },
  plugins: [],
}