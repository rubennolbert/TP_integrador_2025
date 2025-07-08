import ProductModel from '../models/product.models.js';

const ProductController = {
  async list(req, res) {
    try {
      const productos = await ProductModel.getAll();
      res.json(productos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener productos' });
    }
  },

  async getById(req, res) {
    try {
      const producto = await ProductModel.getById(req.params.id);
      if (producto) {
        res.json(producto);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al obtener producto' });
    }
  },

  async create(req, res) {
    try {
      const { nombre, precio, categoria } = req.body;
      const imagen = req.file ? `/images/${req.file.filename}` : null;
      await ProductModel.create({ nombre, precio, imagen, categoria });
      res.json({ mensaje: 'Producto creado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear producto' });
    }
  },

  async update(req, res) {
    try {
      const { nombre, precio, categoria } = req.body;
      const imagen = req.file ? `/images/${req.file.filename}` : null;
      await ProductModel.update(req.params.id, { nombre, precio, imagen, categoria });
      res.json({ mensaje: 'Producto actualizado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar producto' });
    }
  },

  async delete(req, res) {
    try {
      await ProductModel.delete(req.params.id);
      res.json({ mensaje: 'Producto eliminado' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar producto' });
    }
  }
};

export default ProductController;
