import bcrypt from 'bcrypt';
import UserModel from '../models/user.models.js';
import ProductModel from '../models/product.models.js'


const AdminController = {
  renderLogin(req, res) {
    res.render('login');
  },

  async processLogin(req, res) {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findByEmail(email, password);

    console.log(user);

    if (!user) {

      return res.send('Usuario no encontrado');
      
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      return res.send('Contraseña incorrecta');
    }

    req.session.user = user;
    return res.redirect('/admin/dashboard');

  } catch (error) {
    console.error(error);
    res.status(500).send('Error en login');
  }
},




  async renderDashboard(req, res) {
    //if (!req.session.user) return res.redirect('/admin/login');
    try {
      
      const products = await ProductModel.getAll();

      res.render('dashboard', {
        title: "Dashboard Admin",
        productos: products        
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  },

  async renderConsultar(req, res) {
    //if (!req.session.user) return res.redirect('/admin/login');

    try{

      res.render('consultar', {
        title: "Consultar productos"});

    }catch(error){
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  },

  async renderCrear(req, res) {
    //if (!req.session.user) return res.redirect('/admin/login');

    try{

      res.render('crear', {
        title: "Crear productos",});

    }catch(error){
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  },

  async renderModificar(req, res) {
    //if (!req.session.user) return res.redirect('/admin/login');

    try{

      res.render('modificar', {
        title: "Modificar productos",});

    }catch(error){
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  },

  async renderEliminar(req, res) {
    //if (!req.session.user) return res.redirect('/admin/login');

    try{

      res.render('eliminar', {
        title: "Eliminar productos",});

    }catch(error){
      console.error(error);
      res.status(500).send('Error al cargar dashboard');
    }
  },
};

export default AdminController;
