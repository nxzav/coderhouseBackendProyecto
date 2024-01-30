import { Router } from 'express';
import {
  getCarts,
  getCartById,
  createCart,
  addProductInCart,
  deleteProductFromCart,
} from '../controllers/cart.js';

const router = Router();

router.get('/', getCarts)
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductInCart);
router.delete('/:cid/product/:pid', deleteProductFromCart);

export default router;
