import express, { json } from "express";
import ProductModel from "../models/product.model.js";
import CartModel from "../models/cart.model.js";
// import ProductManager from '../models/product.js';

const router = express.Router();
// const products = new ProductManager();

router.get("/", async (req, res) => {
  const limit = parseInt(req.query?.limit ?? 6);
  const page = parseInt(req.query?.page ?? 1);
  const query = req.query?.query ?? "";

  const search = {};
  if (query) search.name = { $regex: query, $options: "i" };

  const result = await ProductModel.paginate(
    {},
    {
      page,
      limit,
      lean: true,
    }
  );

  result.payload = result.docs;
  result.query = query;
  result.status = 'success';
  
  delete result.docs;

  res.render("home", result);
});

router.get("/cart", async (req, res) => {
  const cart = await CartModel.find().lean().exec();
  console.log({cart});
  res.render("cart", {cart});
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

export default router;