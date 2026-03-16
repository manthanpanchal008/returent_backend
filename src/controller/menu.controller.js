const menuModel = require("../model/menu.model");
const imagekit = require("../utils/imagekitconfig");

// Add a new menu item
const additem = async (req, res) => {
  try {
    const { name, price, desc, category } = req.body;
    const file = req.file;

    // Check if item with same name already exists
    const existingItem = await menuModel.findOne({ name });
    if (existingItem) {
      return res.status(400).json({ message: "Item already exists" });
    }

    // Upload image to ImageKit
    const imgResult = await imagekit.files.upload({
      file: file.buffer.toString("base64"), // convert file to base64
      fileName: file.originalname,
      folder: "food-items",
    });

    // Create new menu item in database
    const newItem = await menuModel.create({
      name,
      price,
      desc,
      category,
      img: imgResult.url, // use uploaded image URL
    });

    res.status(201).json({
      message: "Item created successfully",
      data: newItem,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating item",
      error: error.message,
    });
  }
};

// Get all menu items
const allitem = async (req, res) => {
  try {
    const items = await menuModel.find();

    res.status(200).json({
      message: "Items fetched successfully",
      data: items,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error while fetching menu",
      error: error.message,
    });
  }
};

module.exports = { additem, allitem };
