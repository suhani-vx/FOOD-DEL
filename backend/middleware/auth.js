import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.token;

    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized. Please login again.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret_key");
    req.body.userId = decoded.id;

    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error.message);
    return res.json({ success: false, message: "Invalid or expired token" });
  }
};

export default authMiddleware;
