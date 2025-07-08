import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import db from './src/api/database/db.js';

dotenv.config();

const email = 'admin@libreria.com';
const password = 'admin123';

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword]);
    console.log('✅ Usuario admin creado correctamente');
    process.exit();
  } catch (error) {
    console.error('❌ Error creando admin:', error);
    process.exit(1);
  }
};

createAdmin();
