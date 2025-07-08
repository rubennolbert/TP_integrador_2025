import express from 'express';
import multer from 'multer';
import path from 'path';
import ProductController from '../controllers/product.controllers.js';

const router = express.Router();

// Configuración de multer para subir imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// Rutas CRUD de productos
router.get('/', ProductController.list);
router.get('/:id', ProductController.getById);
router.post('/', upload.single('imagen'), ProductController.create);
router.put('/:id', upload.single('imagen'), ProductController.update);
router.delete('/:id', ProductController.delete);

export default router;
