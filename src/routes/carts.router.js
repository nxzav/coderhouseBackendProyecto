import { Router } from 'express';
import { verifyToken, isAdminOrPremium, isUserOrPremium } from '../middleware/auth.middleware.js';
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

router.get('/', [verifyToken, isAdminOrPremium], getCarts);
router.post('/', [verifyToken, isAdminOrPremium], createCart);
router.get('/:cid', [verifyToken, isAdminOrPremium], getCartById);
router.delete('/:cid', [verifyToken, isUserOrPremium], deleteAllProductsInCart);
router.post('/:cid/product/:pid', [verifyToken, isUserOrPremium], addProductInCart);
router.put('/:cid/product/:pid', [verifyToken, isUserOrPremium], updateProductInCart);
router.delete('/:cid/product/:pid', [verifyToken, isUserOrPremium], deleteProductInCart);
router.post('/:cid/purchase', [verifyToken, isUserOrPremium], completePurchase);

export { router as cartRouter };
