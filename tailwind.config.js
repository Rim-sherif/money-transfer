/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary-color))",
        secondary: "rgb(var(--secondary-color))",
        third: "rgb(var(--third-color))",
        dark: "rgb(var(--dark-color))",
        title: "rgb(var(--title-color))",
        content: "rgb(var(--content-color))",
        card: "rgb(var(--card-color))",
        fields: "rgb(var(--fields-color))",
        customTeal: '#14AF8A',
      },
   
    },
  },
  plugins: [],
};
