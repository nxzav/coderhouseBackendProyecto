import fs from "node:fs";
import { Router } from "express";
import Cart from '../models/cart.js';

const router = Router();
const cart = new Cart();

router.get("/", async (req, res) => {
  const result = cart.getCarts();
  res.json({ result });
});

router.get("/:cid", (req, res) => {
  const id = Number(req.params.cid)
  const result = cart.getCartById(id);
  res.json({ result });
});

router.post("/", (req, res) => {
  const result = cart.addCart();

  res.json({ result });
});

router.post('/:cid/product/:pid', (req, res) => {
  res.json('Product added to cart');
});

export default router;