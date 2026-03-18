const servicesModel = require("../model/services.model");


const addService = async (req, res) => {
  try {
    const { title, desc, icon } = req.body;

    // check duplicate
    const isExist = await servicesModel.findOne({ title });

    if (isExist) {
      return res.status(400).json({
        message: "Service already exists",
      });
    }

    // create service
    const service = await servicesModel.create({
      title,
      desc,
      icon,
    });

    return res.status(201).json({
      message: "Service added successfully",
      data: service,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error adding service",
      error: error.message,
    });
  }
};

const getAllServices = async (req, res) => {
  try {
    const services = await servicesModel.find();

    return res.status(200).json({
      message: "services fetch successfully",
      data: services,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error fetching services",
      error: error.message,
    });
  }
};

module.exports = { addService, getAllServices };
