// import ProductManager from "../models/product.js";
import { Router } from "express";
import ProductModel from "../models/product.model.js";

const router = Router();

// const products = new ProductManager();

router.get("/", async (req, res) => {
  const result = await ProductModel.find().lean().exec();
  res.send({ result });
});

router.get("/:pid", async (req, res) => {
  const id = Number(req.params.pid);
  const result = await ProductModel.findById({_id: id});
  res.send({ result });
});

router.post("/", async (req, res) => {
  const newProduct = req.body;
  await ProductModel.create(newProduct);
  console.log(newProduct);
});

// router.put("/:pid", (req, res) => {
//   const id = req.params.pid;
//   const result = products.updateProduct(Number(id), req.body);
//   console.log(Number(id), req.body);
//   res.json({ result });
// });

// router.delete("/:pid", (req, res) => {
//   const id = req.params.pid;
//   const result = products.deleteProduct(Number(id));
//   res.json({ result });
// });

export default router;
