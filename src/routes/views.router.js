import express from 'express';
import ProductManager from '../models/product.js';

const router = express.Router();
const products = new ProductManager();

router.get('/', (req, res) => {
  const productList = products.getProducts();
  res.render('home', { products: productList });
});

router.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', {});
});

export default router;