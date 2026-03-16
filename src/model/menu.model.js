const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    desc: { type: String, required: true },
    category: {
      type: String,
      enum: ["STARTER", "MAIN", "DESSERT", "DRINKS"],
      required: true,
      default: "MAIN",
    },
    img: { type: String },
    isVeg: { type: Boolean, default: true },
    isPopular: { type: Boolean, default: false },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 4,
    },
  },
  { timestamps: true }
);

const menuModel = mongoose.model("menu", menuSchema);

module.exports = menuModel;
