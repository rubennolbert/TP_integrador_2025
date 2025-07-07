const { connect } = require('../db/database');

module.exports = {
  async list(req, res) {
    const db = await connect();
    const productos = await db.all('SELECT * FROM products WHERE activo=1');
    res.json(productos);
  },

  async create(req, res) {
    const { nombre, precio, imagen, categoria } = req.body;
    const db = await connect();
    await db.run(
      'INSERT INTO products (nombre, precio, imagen, categoria) VALUES (?, ?, ?, ?)',
      [nombre, precio, imagen, categoria]
    );
    res.json({ mensaje: "Producto creado" });
  },

  async update(req, res) {
    const id = req.params.id;
    const { nombre, precio, imagen, categoria } = req.body;
    const db = await connect();
    await db.run(
      'UPDATE products SET nombre=?, precio=?, imagen=?, categoria=? WHERE id=?',
      [nombre, precio, imagen, categoria, id]
    );
    res.json({ mensaje: "Producto actualizado" });
  },

  async delete(req, res) {
    const id = req.params.id;
    const db = await connect();
    await db.run('UPDATE products SET activo=0 WHERE id=?', [id]);
    res.json({ mensaje: "Producto dado de baja" });
  }
};
