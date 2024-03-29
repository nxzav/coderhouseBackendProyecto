import { Router } from 'express';
import { verifyToken } from '../middleware/auth.middleware.js';
import {
  getCarts,
  getCartById,
  createCart,
  addProductInCart,
  deleteProductInCart,
  updateProductInCart,
  deleteAllProductsInCart,
  completePurchase,
} from '../controllers/cart.controller.js';

const router = Router();

router.get('/', verifyToken, getCarts);
router.post('/', verifyToken, createCart);
router.get('/:cid', verifyToken, getCartById);
router.delete('/:cid', verifyToken, deleteAllProductsInCart);
router.post('/:cid/product/:pid', addProductInCart);
router.put('/:cid/product/:pid', verifyToken, updateProductInCart);
router.delete('/:cid/product/:pid', verifyToken, deleteProductInCart);
router.post('/:cid/purchase', verifyToken, completePurchase);

export { router as cartRouter };
