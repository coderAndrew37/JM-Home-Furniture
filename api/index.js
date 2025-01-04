require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files (for local testing)
if (process.env.NODE_ENV !== "production") {
  app.use(express.static(path.join(__dirname, "../public")));
}

// Routes
app.use("/api/contact", require("./routes/contact.js"));
app.use("/api/newsletter", require("./routes/newsletter.js"));
app.use("/api/leads", require("./routes/leads.js"));

// Export the app for serverless deployment
module.exports = app;
