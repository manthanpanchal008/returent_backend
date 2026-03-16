const menuModel = require("../model/menu.model");

const additem = async (req, res) => {
  const { name, price, desc, category, img } = req.body;
  //check for already exists or not
  const isMenuIteamExist = await menuModel.findOne({ name });

  if (isMenuIteamExist) {
    return res.status(400).json({ message: "Iteam already exist" });
  }

  const newiteam = await menuModel.create({
    name,
    price,
    desc,
    category,
    img,
  });
  res.status(200).json({ message: "new iteam creaeted succefully", newiteam });
};

const allitem = async (req, res) => {
  try {
    const getallitems = await menuModel.find();
    res.status(200).json({ message: "fetch sucessfully", menu: getallitems });
  } catch (error) {
    res.status(400).json({ message: "error while fetching menu", error });
  }
};

module.exports = { additem, allitem };
