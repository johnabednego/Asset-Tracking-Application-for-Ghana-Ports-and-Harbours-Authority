/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontWeight: {
        normal: 400,
        medium: 500, // Assuming 'medium' corresponds to font-weight 500
        semibold: 600, // Assuming 'semibold' corresponds to font-weight 600
        bold: 700,
        extrabold: 800, // Assuming 'extrabold' corresponds to font-weight 800
        black: 900, // Assuming 'black' corresponds to font-weight 900
        light: 300, // Assuming 'light' corresponds to font-weight 300
      },
      screens: {
        xs: "350px",
        xf: "450px",
        xm: "500px",
      },
      boxShadow: {
        input: "10px 10px 40px 4px rgba(0, 0, 0, 0.15)",
        hero: "10px 10px 40px 4px rgba(0, 0, 0, 0.25)",
        adminLogIn: "10px 10px 40px 4px rgba(0, 0, 0, 0.08)",
        searchBar: "10px 10px 40px 4px rgba(0, 0, 0, 0.05)",
        switchBar: "10px 10px 40px 4px rgba(0, 0, 0, 0.1)",
        customTooltip: "10px 10px 40px 0px rgba(0, 0, 0, 0.15)",
      },
    },
  },
  plugins: [],
};
