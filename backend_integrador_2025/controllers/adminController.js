const bcrypt = require('bcrypt');
const { connect } = require('../db/database');

module.exports = {
  renderLogin(req, res) {
    res.render('login');
  },

  async processLogin(req, res) {
    const { email, password } = req.body;
    const db = await connect();
    const user = await db.get('SELECT * FROM users WHERE email=?', [email]);

    if (user && await bcrypt.compare(password, user.password)) {
      req.session.user = user;
      res.redirect('/admin/dashboard');
    } else {
      res.send('Login incorrecto');
    }
  },

  async renderDashboard(req, res) {
    if (!req.session.user) return res.redirect('/admin/login');
    const db = await connect();
    const productos = await db.all('SELECT * FROM products');
    res.render('dashboard', { productos });
  }
};
