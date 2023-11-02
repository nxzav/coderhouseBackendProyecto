import express from 'express';
import ProductManager from '../models/product.js';

const router = express.Router();

const products = new ProductManager();

router.get('/', (req, res) => {
  const productList = products.getProducts();
  console.log(productList);
  res.render('home', { p: productList });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {});
});

export default router;