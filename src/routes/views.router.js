import express, { json } from "express";
import ProductModel from "../models/product.model.js";
import CartModel from "../models/cart.model.js";
import __dirname from "../utils.js";
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

  let prevLink;
  let nextLink;
  result.prevPage !== null
    ? (prevLink = `/?page=${page - 1}`)
    : (prevLink = null);
  result.nextPage !== null
    ? (nextLink = `/?page=${page + 1}`)
    : (nextLink = null);

  result.payload = result.docs;
  result.query = query;
  result.status = "success";
  result.prevLink = prevLink;
  result.nextLink = nextLink;

  delete result.docs;

  console.log({ result });
  res.render("home", result);
});

router.get("/carts", async (req, res) => {
  const carts = await CartModel.find().populate('products.product');
  console.log({carts})
  res.render("carts", {carts});
  // res.send(carts);
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

export default router;