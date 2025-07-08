import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import { __dirname, join } from './src/api/utils/index.js';

import routes from './src/api/routes/index.js';

dotenv.config();

const app = express();

// EJS
app.set('view engine', 'ejs');
app.set('views', join(__dirname, 'src/views'));


// Static
app.use(express.static(join(__dirname, 'public')));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

// Routes
app.use('/api/products', routes);

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
