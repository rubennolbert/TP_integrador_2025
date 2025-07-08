import SaleModel from '../models/sale.models.js';

const SaleController = {
  async create(req, res) {
    try {
      const { cliente, carrito } = req.body;
      const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);

      await SaleModel.create(cliente, carrito, total);
      res.json({ mensaje: 'Venta registrada correctamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al registrar venta' });
    }
  }
};

export default SaleController;
