const express = require("express");
const { register, login } = require("../controller/auth.controller");

const router = express.Router();

// Route to register a new user
router.post("/register", register);

// Route to login an existing user
router.post("/login", login);

module.exports = router; // Export router for use in app.js