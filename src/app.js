const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes"); // Auth-related routes
const menuRoutes = require("./routes/menu.routes"); // Menu-related routes

const app = express();

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to parse cookies
app.use(cookieParser());

// Enable CORS for specified origins
app.use(cors({
  origin: [
    "http://localhost:3000",
    "http://localhost:5173",
    "https://returent-backend.onrender.com"
  ],
  credentials: true
}));

// Test route to check if API is running
// app.get("/", (req, res) => {
//   res.send("API is running");
// });

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/menuiteams", menuRoutes);

module.exports = app; // Export app for server.js