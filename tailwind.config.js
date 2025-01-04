module.exports = {
  content: ["./public/**/*.{html,js}", "./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        idcPrimary: "#2c3e50", // Dark slate
        idcAccent: "#ecf0f1", // Light gray
        idcBackground: "#f8f9fa", // Off-white
        idcText: "#34495e", // Text color
        idcHighlight: "#f4d03f", // Light yellow highlight
      },
      fontFamily: {
        idcSans: ["Poppins", "sans-serif"], // Modern and stylish
        idcSerif: ["Playfair Display", "serif"], // Artistic headers
      },
      fontSize: {
        idcHero: "3rem",
        idcSubHero: "1.25rem",
      },
      spacing: {
        128: "32rem",
        144: "36rem",
        96: "24rem",
      },
      transitionTimingFunction: {
        "in-out": "ease-in-out",
      },
      borderRadius: {
        xl: "1.25rem",
      },
      keyframes: {
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-5px)" },
          "50%": { transform: "translateX(5px)" },
          "75%": { transform: "translateX(-5px)" },
        },
      },
      animation: {
        shake: "shake 1.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
