// const galleryModel = require("../model/gallery.model");
const eventsModel = require("../model/events.model")
const imagekit = require("../utils/imagekitconfig");    

// ✅ Add Gallery Image
const addgallary = async (req, res) => {
  try {
    const { category } = req.body;
    const image = req.file;

    // Upload image to ImageKit
    const imgResult = await imagekit.files.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "events", // better folder name
    });

    // Save in DB
    const newImage = await eventsModel.create({
        category,
      img: imgResult.url, // store only URL
    });

    return res.status(201).json({
      message: "Image added to gallery",
      data: newImage,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error adding gallery image",
      error: error.message,
    });
  }
};

// ✅ Get All Gallery Images
const getallgallary = async (req, res) => {
  try {
    const images = await eventsModel
      .find()

    return res.status(200).json({
        message:"images fetch successfully",
      data: images,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching gallery",
      error: error.message,
    });
  }
};

module.exports = { addgallary, getallgallary };