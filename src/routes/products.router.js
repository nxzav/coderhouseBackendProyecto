// import ProductManager from "../models/product.js";
import { Router } from "express";
import ProductModel from "../models/product.model.js";
import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from "../controllers/products.controller.js";

const router = Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.get("/:pid", getProductById);
router.put("/:pid", updateProduct);
router.delete("/:pid", deleteProduct);

export default router;