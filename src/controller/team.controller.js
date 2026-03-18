const teamModel = require("../model/team.model");
const imagekit = require("../utils/imagekitconfig");


const addteam = async (req, res) => {
  try {
    const { name, position, socialmedia } = req.body;
    const image = req.file;

    // Check if profile already exists
    const isProfileExists = await teamModel.findOne({ name });

    if (isProfileExists) {
      return res.status(400).json({ message: "Team member already exists" });
    }

    // Upload image to ImageKit
    const imgResult = await imagekit.files.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "team",
    });

    // Save in DB
    const teammember = await teamModel.create({
      name,
      position,
      socialmedia,
      profile: imgResult.url, // better to store URL only
    });

    return res.status(201).json({
      message: "Team member added successfully",
      data: teammember,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};

const getallteam = async (req, res) => {
  try {
    const team = await teamModel.find();

    return res.status(200).json({
      message: "Team members fetched successfully",
      data: team,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Something went wrong",
      error: error.message,
    });
  }
};


module.exports = { addteam,getallteam };