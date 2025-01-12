import express from 'express';
import { getAllProducts } from '../controllers/frontProductController.js';

const router = express.Router();

// Define the route for fetching products
router.get('/products', getAllProducts);

export default router;
