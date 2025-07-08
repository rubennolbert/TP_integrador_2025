import bcrypt from 'bcrypt';
import UserModel from '../models/user.models.js';
import ProductController from '../controllers/product.controllers.js';

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
      const products = await ProductController.getAll();
      res.render('dashboard', {
        title: "Dashboard Admin",
        productos: products[0]
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  },

  async renderConsultar(req, res) {
    if (!req.session.user) return res.redirect('/admin/login');

    try{

      const products = await ProductController.getById();
      res.render('consultar', {
        title: "Consultar productos"});

    }catch(error){
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  },

  async renderCrear(req, res) {
    if (!req.session.user) return res.redirect('/admin/login');

    try{

      const products = await ProductController.create();
      res.render('crear', {
        title: "Crear productos",});

    }catch(error){
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  },

  async renderModificar(req, res) {
    if (!req.session.user) return res.redirect('/admin/login');

    try{

      const products = await ProductController.update();
      res.render('modificar', {
        title: "Modificar productos",});

    }catch(error){
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  },

  async renderEliminar(req, res) {
    if (!req.session.user) return res.redirect('/admin/login');

    try{

      const products = await ProductController.delete();
      res.render('eliminar', {
        title: "Eliminar productos",});

    }catch(error){
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  },
};

export default AdminController;
