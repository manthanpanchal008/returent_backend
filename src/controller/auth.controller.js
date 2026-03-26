const userModel = require("../model/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../service/sendMail");

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
  const token = jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET);
  console.log(token)
  // Set token in cookie and respond
  res.cookie("token", token);
  res.status(200).json({ messgae: "Register succesfully", user });
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
  // await sendEmail('manthanpanchal008@gmail.com',131213);
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

const users = async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json({ message: "users fetch successfully", data: users });
  } catch (error) {
    res.status(400).json({
      message: "error while fetching all users",
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, name, email, phone, password } = req.body;

    let updateData = {
      username,
      name,
      email,
      phone,
    };

    // If password is provided → hash it
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      userId,
      updateData,
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      data: updatedUser,
    });

  } catch (error) {
    res.status(500).json({
      message: "Error updating user",
      error: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const deletedUser = await userModel.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting user",
      error: error.message,
    });
  }
};

module.exports = { register, login, users ,updateUser,deleteUser};
