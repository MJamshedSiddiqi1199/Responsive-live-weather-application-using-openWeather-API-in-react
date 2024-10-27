/** @type {import('tailwindcss').Config} */
export default {
  mode: "jit",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Ensure this path covers your entire src directory
    "./src/Components/**/*.{js,jsx}",
  ], // Ensure the components are covered,
  theme: {
    extend: {},
  },
  plugins: [],
};
