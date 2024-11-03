// routes/categoryRoutes.js
import express from 'express';
import CategoryController from '../controllers/CategoryController.js';

const router = express.Router();

router.get('/', CategoryController.getAllCategories);
router.post('/', CategoryController.createCategory);

export default router;
