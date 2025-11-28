import express from "express";
import cors from "cors";
import { connectDB } from "./config/db.js";
import foodRouter from "./routes/foodRoute.js";
import userRouter from "./routes/userRoute.js";
import cartRouter from "./routes/cartRoute.js";   // ✅ added import
import 'dotenv/config';
import orderRouter from "./routes/orderRoute.js";

// app config
const app = express();
const port = 4000;

// middleware
app.use(express.json());
app.use(cors());

// ✅ CSP header to allow inline data images
app.use((req, res, next) => {
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; img-src 'self' data:;"
  );
  next();
});

// db connection
connectDB();

// api endpoints
app.use("/api/food", foodRouter);
app.use("/images", express.static("uploads"));
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);   // ✅ now properly defined
app.use("/api/order",orderRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

app.listen(port, () => {
  console.log(`Server Starting on http://localhost:${port}`);
});
