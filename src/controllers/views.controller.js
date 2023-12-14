import { request, response } from "express";
import { getProducts } from "./products.controller.js";
import MessageModel from "../models/chat.model.js";
import CartModel from "../models/cart.model.js";
import UserModel from "../models/user.model.js";

export const homeView = async (req = request, res = response) => {
  try {
    if (req.session.user) {
      const { first_name, last_name } = req.session.user;
      const result = await getProducts({ ...req.query });
      result.user_name = `${first_name}`;
      return res.render("home", result);
    } else {
      const result = await getProducts({ ...req.query });
      return res.render("home", result)
    }
  } catch (error) {
    throw error;
  }
};

export const rtpView = async (req = request, res = response) => {
  return res.render("realTimeProducts", { title: "Real Time Products" });
};

export const chatView = async (req = request, res = response) => {
  const messages = await MessageModel.find().lean().exec();
  return res.render("chat", { title: "Chat", messages });
};

export const cartsView = async (req = request, res = response) => {
  const carts = await CartModel.find()
    .populate("products.product")
    .lean()
    .exec();

  return res.render("carts", { title: "Carts", carts });
};

export const singleCartView = async (req = request, res = response) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.cid }).lean().exec();
    return res.render("cart", cart);
  } catch (error) {
    console.log(error);
    res.send("Error to show product");
  }
};

export const profileView = async (req = request, res = response) => {
  const user = req.session.user;

  res.render("profile", { user, style: "profile.css" });
};

export const loginGet = async (req = request, res = response) => {
  if (req.session?.user) {
    return res.redirect("/profile");
  }
  return res.render("login", {});
};

export const registerGet = async (req = request, res = response) => {
  if (req.session?.user) {
    return res.redirect("/profile");
  }
  return res.render("register", {});
};