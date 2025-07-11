import { Router } from 'express';
import AdminController from '../controllers/admin.controllers.js';
import { isAuthenticated } from '../middleware/middlewares.js';

const router = Router();

// Login
router.get('/login', AdminController.renderLogin);
router.post('/login', AdminController.processLogin);

// Dashboard protegido
router.get('/dashboard', AdminController.renderDashboard);

router.get('/dashboard/consultar', AdminController.renderConsultar);

router.get('/dashboard/crear', AdminController.renderCrear);

router.get('/dashboard/modificar', AdminController.renderModificar);

router.get('/dashboard/eliminar', AdminController.renderEliminar);

export default router;
