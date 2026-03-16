const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/auth.routes");
const menuRoutes = require("./routes/menu.routes");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: [
    "http://localhost:5000",
    "http://localhost:5173",
    "https://returent-backend.onrender.com"
  ],
  credentials: true
}));
app.get("/", (req,res)=>{
    res.send("API is running");
  });
// routes
app.use("/api/auth", authRoutes);
app.use("/api/menuiteams", menuRoutes);

module.exports = app;