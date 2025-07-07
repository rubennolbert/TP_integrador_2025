const express = require('express');
const router = express.Router();
const controller = require('../controllers/adminController');

router.get('/login', controller.renderLogin);
router.post('/login', controller.processLogin);
router.get('/dashboard', controller.renderDashboard);

module.exports = router;
