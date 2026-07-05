/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darker: '#000000', // Deepest background
        dark: '#0a0a0a',   // Card/Sidebar background
        light: '#f5f5f5',  // Primary text
      }
    },
  },
  plugins: [],
}