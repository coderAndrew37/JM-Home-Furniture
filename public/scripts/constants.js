export const baseUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:8000" // Local environment
    : "https://jm-home-furniture.onrender.com"; // Production environment
