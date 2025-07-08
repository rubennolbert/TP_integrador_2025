import express from 'express';
import SaleController from '../controllers/sale.controllers.js';

const router = express.Router();

// Guardar ventas (carrito)
router.post('/', SaleController.create);

export default router;
