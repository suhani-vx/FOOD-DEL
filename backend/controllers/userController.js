import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// 🔹 Create Token Function
const createToken = (id) => {
  // make sure your .env file has JWT_SECRET defined properly
  return jwt.sign({ id }, process.env.JWT_SECRET || "default_secret_key", {
    expiresIn: "7d", // optional expiry
  });
};

// 🔹 Login User
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid credentials" });
    }

    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log("Login Error:", error.message);
    res.json({ success: false, message: "Server error" });
  }
};

// 🔹 Register User
const registerUser = async (req, res) => {
  const { name, password, email } = req.body;
  try {
    // check if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Please enter a valid email!" });
    }

    // validate password
    if (password.length < 8) {
      return res.json({
        success: false,
        message: "Password must be at least 8 characters long!",
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();

    // generate token
    const token = createToken(user._id);
    res.json({ success: true, token });
  } catch (error) {
    console.log("Register Error:", error.message);
    res.json({ success: false, message: "Error registering user" });
  }
};

export { loginUser, registerUser };
