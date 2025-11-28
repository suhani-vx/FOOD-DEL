import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";

// placing user order for frontend
const placeOrder = async (req, res) => {
  try {
    // create new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentStatus: "pending",  // optional
      orderStatus: "placed"
    });

    await newOrder.save();

    // clear cart
    await userModel.findByIdAndUpdate(req.body.userId, {
      cartData: {}
    });

    // response back to frontend
    res.json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id
    });

  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: "Error placing order"
    });
  }
};

export { placeOrder };
