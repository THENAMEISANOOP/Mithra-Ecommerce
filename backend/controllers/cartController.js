import UserModel from "../models/userModel.js";

// Add product to user's cart
export const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId;

    const userData = await UserModel.findById(userId);
    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;

    await UserModel.findByIdAndUpdate(userId, { cartData });

    res.json({ message: "Product added to cart", status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", status: 500 });
  }
};

// Update product quantity in cart
export const updateCart = async (req, res) => {
  try {
    const { itemId, size, quantity } = req.body;
    const userId = req.userId;

    const userData = await UserModel.findById(userId);
    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      cartData[itemId][size] = quantity;
    }

    await UserModel.findByIdAndUpdate(userId, { cartData });

    res.json({ message: "Cart updated", status: 200 });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", status: 500 });
  }
};

// Get user's cart
export const getUserCart = async (req, res) => {
  try {
    const userId = req.userId;
    const userData = await UserModel.findById(userId);
    const cartData = userData.cartData || {};

    res.json({ message: "Cart data", status: 200, data: cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error", status: 500 });
  }
};
