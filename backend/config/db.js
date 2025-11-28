import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect("mongodb+srv://suhaniverma1025:Suhani2025@cluster0.8uqrhth.mongodb.net/food-del").then(()=>console.log("DB Connected"));
};


export default connectDB;

