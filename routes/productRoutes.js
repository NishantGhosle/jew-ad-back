import express from 'express';
import upload from '../middleware/multer.js';
import { getProducts, addProduct, editProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

router.get('/', getProducts);
router.post('/', upload.array('images', 5), addProduct);
router.put('/:id', upload.array('images', 5), editProduct);
router.delete('/product/:id', deleteProduct);

export default router;

