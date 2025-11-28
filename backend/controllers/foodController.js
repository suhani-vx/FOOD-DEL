import foodModel from "../models/foodModel.js";
import fs from "fs";

// ➕ Add Food
const addFood = async (req, res) => {
  try {
    // check if image was uploaded
    let image_filename = req.file ? req.file.filename : null;

    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      image: image_filename,
    });

    await food.save();
    res.json({ success: true, message: "Food Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error while adding food" });
  }
};

// 📋 Get all food list
const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    res.json({ success: true, data: foods });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error while fetching food list" });
  }
};

//remove food item
const removeFood = async (req, res) => {
  try {
    const food = await foodModel.findById(req.body.id);

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    // Delete image if exists
    if (food.image) {
      fs.unlink(`uploads/${food.image}`, (err) => {
        if (err) console.log("Error deleting file:", err);
      });
    }

    await foodModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Food Removed" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error while removing food" });
  }
};


export { addFood, listFood, removeFood };
