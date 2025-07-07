const { connect } = require('../db/database');

module.exports = {
  async create(req, res) {
    const { cliente, carrito } = req.body;
    const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

    const db = await connect();
    const result = await db.run(
      'INSERT INTO sales (cliente, total) VALUES (?, ?)',
      [cliente, total]
    );
    const saleId = result.lastID;

    for (let item of carrito) {
      await db.run(
        'INSERT INTO sale_products (saleId, productId) VALUES (?, ?)',
        [saleId, item.id]
      );
    }

    res.json({ mensaje: "Venta guardada correctamente" });
  }
};
