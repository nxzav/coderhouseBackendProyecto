import fs from "node:fs";
import { Router } from "express";
import ProductManager from "../models/product.js";

const router = Router();

const products = new ProductManager();

router.get("/", async (req, res) => {
  const result = products.getProducts();
  res.json({ result });
});

router.get("/:pid", (req, res) => {
  const id = Number(req.params.pid);
  const result = products.getProductById(id);
  res.json({ result });
});

router.post("/", (req, res) => {
  const { title, description, code, price, status, stock, category, thumbnails } = req.body;
  const result = products.addProduct(title, description, code, price, status, stock, category, thumbnails);
  console.log(result);
  res.json({ result });
});

router.put("/:pid", (req, res) => {
  const id = req.params.pid;
  const result = products.updateProduct(Number(id), req.body);
  console.log(Number(id), req.body);
  res.json({ result });
});

router.delete("/:pid", (req, res) => {
  const id = req.params.pid;
  const result = products.deleteProduct(Number(id));
  res.json({ result });
});

export default router;