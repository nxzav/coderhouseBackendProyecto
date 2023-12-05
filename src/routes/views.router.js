import express from "express";
import ProductModel from "../models/product.model.js";
import CartModel from "../models/cart.model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const limit = parseInt(req.query?.limit ?? 6);
  const page = parseInt(req.query?.page ?? 1);
  const query = req.query?.query ?? "";
  const order = parseInt(req.query?.sort ?? 1);
  console.log({ order });

  const search = {};
  if (query) search.title = { $regex: query, $options: "i" };

  const result = await ProductModel.paginate(search, {
    page,
    limit,
    sort: { price: order },
    lean: true,
  });

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

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/carts", async (req, res) => {
  const carts = await CartModel.find()
    .populate("products.product")
    .lean()
    .exec();
  console.log({ carts });
  res.render("carts", { carts });
});

router.get("/carts/:cid", async (req, res) => {
  try {
    const cart = await CartModel.findOne({ _id: req.params.cid })
      .populate("products.product")
      .lean()
      .exec();
    console.log(req.params.cid);
    console.log(cart);
    res.render("cartsOne", cart);
  } catch (error) {
    console.log(error);
    res.send("Error to show product");
  }
});

export default router;
