const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { username, name, email, phone, password } = req.body;

  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
    res.status(402).json({ messgae: "user Already Exists" });
  }

  const hashpassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    name,
    email,
    phone,
    password: hashpassword,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.status(200).json({ messgae: "Register succesfully" });
};

const login = async (req, res) => {
  const { username, email, password } = req.body;

  const userexits = await userModel.findOne({
    $or: [{ username }, { email }],
  });
  console.log(userexits);

  if (!userexits) {
    return res.status(400).json({ messgae: "invalid credentials" });
  }

  const verifypassword = await bcrypt.compare(password, userexits.password);

  if (!verifypassword) {
    return res.status(400).json({ messgae: "password credentials" });
  }

  const token = jwt.sign({ id: userexits._id }, process.env.JWT_SECRET);

  res.cookie("token", token);
  res.status(200).json({ messgae: "login successful" });
};


module.exports = { register, login };
