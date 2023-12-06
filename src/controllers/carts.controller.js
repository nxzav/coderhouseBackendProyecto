import { request, response } from "express";
import CartModel from "../models/cart.model.js";

export const getCartById = async (req = request, res = response) => {
  try {
    const { cid } = req.params;
    const result = await CartModel.findById(cid);

    if (result) return res.json({ result });
    return res.status(404).json({ msg: `Cart with id ${cid} does not exist` });
  } catch (error) {
    console.log("getCarById:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const createCart = async (req = request, res = response) => {
  try {
    const result = await CartModel.create({});
    return res.json({ msg: "Cart created:", result });
  } catch (error) {
    console.log("createCart:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};

export const addProductInCart = async (req = request, res = response) => {
  try {
    const { cid, pid } = req.params;
    const result = await CartModel.findById(cid);
    console.log(result);

    if (!result)
      return res
        .status(404)
        .json({ msg: `Cart with id ${cid} does not exist` });

    const isProductInCart = result.products.find(e => e.product._id.toString() === pid);
    console.log({isProductInCart});
    if (isProductInCart)
      isProductInCart.quantity++;
    else result.products.push({ product: pid, quantity: 1 });

    result.save();

    return res.json({ msg: "Cart updated:", result });
  } catch (error) {
    console.log("createCart:", error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
};