const menuModel = require("../model/menu.model");

const additem = async (req, res) => {
  try {

    const { name, price, desc, category, img } = req.body;

    const existingItem = await menuModel.findOne({ name });

    if (existingItem) {
      return res.status(400).json({
        message: "Item already exists"
      });
    }

    const newItem = await menuModel.create({
      name,
      price,
      desc,
      category,
      img,
    });

    res.status(201).json({
      message: "Item created successfully",
      data: newItem
    });

  } catch (error) {

    res.status(500).json({
      message: "Error creating item",
      error: error.message
    });

  }
};

const allitem = async (req, res) => {
  try {

    const items = await menuModel.find();

    res.status(200).json({
      message: "Items fetched successfully",
      data: items
    });

  } catch (error) {

    res.status(500).json({
      message: "Error while fetching menu",
      error: error.message
    });

  }
};

module.exports = { additem, allitem };