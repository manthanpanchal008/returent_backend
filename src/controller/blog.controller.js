const blogModel = require("../model/blog.model");
const imagekit = require("../utils/imagekitconfig");    

// ✅ Add Blog
const addBlog = async (req, res) => {
  try {
    const { topic, desc } = req.body;
    const image = req.file;

    // upload image to ImageKit
    const imgResult = await imagekit.files.upload({
      file: image.buffer.toString("base64"),
      fileName: image.originalname,
      folder: "blog",
    });

    // save in DB
    const blog = await blogModel.create({
      topic,
      desc,
      img: imgResult.url,
    });

    return res.status(201).json({
      message: "Blog added successfully",
      data: blog,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error adding blog",
      error: error.message,
    });
  }
};

// ✅ Get All Blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel
      .find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      count: blogs.length,
      data: blogs,
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error fetching blogs",
      error: error.message,
    });
  }
};

module.exports = { addBlog, getAllBlogs };