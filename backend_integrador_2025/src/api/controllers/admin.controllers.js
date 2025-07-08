import bcrypt from 'bcrypt';
import UserModel from '../models/user.models.js';
import ProductModel from '../models/product.models.js';

const AdminController = {
  renderLogin(req, res) {
    res.render('login');
  },

  async processLogin(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserModel.findByEmail(email);
      if (user && await bcrypt.compare(password, user.password)) {
        req.session.user = user;
        res.redirect('/admin/dashboard');
      } else {
        res.send('Login incorrecto');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error en login');
    }
  },

  async renderDashboard(req, res) {
    if (!req.session.user) return res.redirect('/admin/login');
    try {
      const productos = await ProductModel.getAll();
      res.render('dashboard', { productos });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  }
};

export default AdminController;
