const express = require("express");
const { register, login, users, updateUser, deleteUser, verifyotp } = require("../controller/auth.controller");

const router = express.Router();

// Route to register a new user
router.post("/register", register);
router.post("/verifyotp",verifyotp)
router.get("/users",users)
router.put("/updateuser/:id",updateUser );
router.delete("/deleteuser/:id", deleteUser);


// Route to login an existing user
router.post("/login", login);


module.exports = router; // Export router for use in app.js