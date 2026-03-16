const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register new user
const register = async (req, res) => {
  const { username, name, email, phone, password } = req.body;

  // Check if user with same username or email already exists
  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    return res.status(402).json({ messgae: "user Already Exists" });
  }

  // Hash the password before storing
  const hashpassword = await bcrypt.hash(password, 10);

  // Create user in database
  const user = await userModel.create({
    username,
    name,
    email,
    phone,
    password: hashpassword,
  });

  // Generate JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  // Set token in cookie and respond
  res.cookie("token", token);
  res.status(200).json({ messgae: "Register succesfully" ,user});
};

// Login existing user
const login = async (req, res) => {
  const { username, email, password } = req.body;

  // Find user by username or email
  const userexits = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (!userexits) {
    return res.status(400).json({ messgae: "invalid credentials" });
  }

  // Verify password
  const verifypassword = await bcrypt.compare(password, userexits.password);

  if (!verifypassword) {
    return res.status(400).json({ messgae: "invalid password" });
  }

  // Generate JWT token
  const token = jwt.sign({ id: userexits._id }, process.env.JWT_SECRET);

  // Set token in cookie and respond
  res.cookie("token", token);
  res.status(200).json({ messgae: "login successful" });
};

module.exports = { register, login };
