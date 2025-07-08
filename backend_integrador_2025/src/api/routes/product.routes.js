import { Router } from 'express';
import ProductController from '../controllers/product.controllers.js';

const router = Router();

// Rutas CRUD de productos
router.get('/', ProductController.list);
router.get('/:id', ProductController.getById);
router.post('/', ProductController.create);
router.put('/:id', ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
