import { Router } from 'express';
import {
  getCarts,
  getCartById,
  createCart,
  addProductInCart,
  deleteProductInCart,
  updateProductInCart,
  deleteAllProductsInCart,
} from '../controllers/cart.js';

const router = Router();

router.get('/', getCarts)
router.get('/:cid', getCartById);
router.post('/', createCart);
router.post('/:cid/product/:pid', addProductInCart);
router.put('/:cid/product/:pid', updateProductInCart)
router.delete('/:cid', deleteAllProductsInCart)
router.delete('/:cid/product/:pid', deleteProductInCart);

export default router;
