import { Router } from 'express';

import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/product.controller.js';
import { isAdminOrPremium, verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getProducts);
router.get('/:pid', verifyToken, getProductById);
router.post('/', [verifyToken, isAdminOrPremium], addProduct);
router.put('/:pid', [verifyToken, isAdminOrPremium], updateProduct);
router.delete('/:pid', [verifyToken, isAdminOrPremium], deleteProduct);

export { router as productRouter };
