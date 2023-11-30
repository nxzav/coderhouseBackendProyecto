import express from "express";
import ProductModel from "../models/product.model.js";
// import ProductManager from '../models/product.js';

const router = express.Router();
// const products = new ProductManager();

router.get("/", async (req, res) => {
  const limit = parseInt(req.query?.limit ?? 6);
  const page = parseInt(req.query?.page ?? 1);

  const result = await ProductModel.paginate({},
    {
      page,
      limit,
      lean: true,
    }
  );
  res.render("home", result);
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {});
});

export default router;