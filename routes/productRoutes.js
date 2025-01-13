import express from 'express';
import { getAllProducts, addProduct, deleteProduct } from '../controllers/productController.js';
import { upload } from '../middleware/multer.js';

const router = express.Router();

router.get('/', getAllProducts);
router.post('/products', upload.array('images', 3),addProduct);
router.delete('/:id', deleteProduct);

export default router;

