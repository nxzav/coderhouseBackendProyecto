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
router.get('/:cid', verifyToken, getCartById);
router.post('/', verifyToken, createCart);
router.post('/:cid/product/:pid', verifyToken, addProductInCart);
router.put('/:cid/product/:pid', verifyToken, updateProductInCart);
router.post('/:cid/purchase', verifyToken, completePurchase);
router.delete('/:cid', verifyToken, deleteAllProductsInCart);
router.delete('/:cid/product/:pid', verifyToken, deleteProductInCart);

export { router as cartRouter };
