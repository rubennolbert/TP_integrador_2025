import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import routes from './src/api/routes/index.js';

dotenv.config();

const app = express();

// Para __dirname en ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src', 'api', 'views'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use('/', routes);

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
