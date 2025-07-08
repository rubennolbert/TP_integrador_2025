import db from '../database/db.js';

const SaleModel = {
  async create(cliente, carrito, total) {
    const [result] = await db.query(
      'INSERT INTO sales (cliente, total) VALUES (?, ?)',
      [cliente, total]
    );
    const saleId = result.insertId;

    for (const item of carrito) {
      await db.query(
        'INSERT INTO sale_products (sale_id, product_id) VALUES (?, ?)',
        [saleId, item.id]
      );
    }
  }
};

export default SaleModel;
