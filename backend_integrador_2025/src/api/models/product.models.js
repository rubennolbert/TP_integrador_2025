import db from '../database/db.js';

const ProductModel = {
  async getAll() {
    const [rows] = await db.query('SELECT * FROM products');
    return rows;
  },

  async getById(id) {
    const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows[0];
  },

  async create({imagen, nombre, precio, categoria }) {
    await db.query(
      'INSERT INTO products (nombre, precio, imagen, categoria) VALUES (?, ?, ?, ?)',
      [nombre, precio, imagen, categoria]
    );
  },

  async update(id, {imagen, nombre, precio, categoria }) {
    await db.query(
      'UPDATE products SET nombre = ?, precio = ?, imagen = ?, categoria = ? WHERE id = ?',
      [imagen, nombre, precio, categoria, id]
    );
  },

  async delete(id) {
    await db.query('DELETE FROM products WHERE id = ?', [id]);
  }
};

export default ProductModel;
