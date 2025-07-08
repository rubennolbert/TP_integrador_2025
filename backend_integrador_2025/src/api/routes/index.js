import express from 'express';
import productRoutes from './product.routes.js';
import saleRoutes from './sale.routes.js';
import adminRoutes from './admin.routes.js';

const router = express.Router();

router.use('/api/products', productRoutes);
router.use('/api/sales', saleRoutes);
router.use('/admin', adminRoutes);

export default router;
