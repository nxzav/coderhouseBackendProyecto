import { Router } from "express";
import CartModel from "../models/cart.model.js";
import ProductModel from "../models/product.model.js";
// import Cart from '../models/cart.js';

const router = Router();
// const cart = new Cart();

router.get("/", async (req, res) => {
  const result = await CartModel.find().populate('products.product');
  console.log(result);
  res.send(result);
});

router.get("/:cid", async (req, res) => {
  const result = await CartModel.findOne({ _id: req.params.cid });
  console.log(result);
  res.send(result);
});

router.post("/", async (req, res) => {
  const result = req.body;
  
})

// router.get("/:cid", (req, res) => {
//   const id = Number(req.params.cid)
//   const result = cart.getCartById(id);
//   res.json({ result });
// });

// router.post("/", (req, res) => {
//   const result = cart.addCart();

//   res.json({ result });
// });

// router.post('/:cid/product/:pid', (req, res) => {
//   res.json('Product added to cart');
// });

export default router;
