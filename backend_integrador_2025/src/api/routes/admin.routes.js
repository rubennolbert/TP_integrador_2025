import { Router } from 'express';
import AdminController from '../controllers/admin.controllers.js';
import { isAuthenticated } from '../middleware/middlewares.js';

const router = Router();

// Login
router.get('/login', AdminController.renderLogin);
router.post('/login', AdminController.processLogin);

// Dashboard protegido
router.get('/dashboard', isAuthenticated, AdminController.renderDashboard);

router.get('/dashboard/consultar', isAuthenticated, AdminController.renderConsultar);

router.get('/dashboard/crear', isAuthenticated, AdminController.renderCrear);

router.get('/dashboard/modificar', isAuthenticated, AdminController.renderModificar);

router.get('/dashboard/eliminar', isAuthenticated, AdminController.renderEliminar);

export default router;
