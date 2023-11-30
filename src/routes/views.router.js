import express from 'express';
import ProductModel from '../models/product.model.js';
// import ProductManager from '../models/product.js';

const router = express.Router();
// const products = new ProductManager();

router.get('/', async (req, res) => {
  const productList = await ProductModel.find().lean().exec();
  res.render('home', { products: productList });
});

router.get('/realtimeproducts', async (req, res) => {
  const products = await ProductModel.find().lean().exec();
  res.render('realTimeProducts', {products});
});

export default router;