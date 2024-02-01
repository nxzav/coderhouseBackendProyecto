import { Router } from 'express';

import {
  addProduct,
  deleteProduct,
  getProductById,
  getProducts,
  updateProduct,
} from '../controllers/product.controller.js';
import { isAdmin, verifyToken } from '../middleware/auth.middleware.js';

const router = Router();

router.get('/', verifyToken, getProducts);
router.get('/:pid', verifyToken, getProductById);
router.post('/', [verifyToken, isAdmin], addProduct);
router.put('/:pid', [verifyToken, isAdmin], updateProduct);
router.delete('/:pid', [verifyToken, isAdmin], deleteProduct);

export { router as productRouter };
