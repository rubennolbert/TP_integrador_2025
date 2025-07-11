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
app.use(express.static(join(__dirname, 'src', 'api', 'public')));

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/', routes);

// Start
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
