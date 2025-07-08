import express from 'express';
import AdminController from '../controllers/admin.controllers.js';
import { isAuthenticated } from '../middleware/middlewares.js';

const router = express.Router();

// Login
router.get('/login', AdminController.renderLogin);
router.post('/login', AdminController.processLogin);

// Dashboard protegido
router.get('/dashboard', isAuthenticated, AdminController.renderDashboard);

export default router;
