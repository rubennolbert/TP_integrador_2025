require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');

async function connect() {
  return open({
    filename: process.env.DB_FILE,
    driver: sqlite3.Database
  });
}

// DB Init, ejecutar una vez para configurar las tablas
async function init() {
  const db = await connect();
  
  await db.exec(`
    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT,
      precio REAL,
      imagen TEXT,
      categoria TEXT,
      activo INTEGER DEFAULT 1
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS sales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      cliente TEXT,
      total REAL,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS sale_products (
      saleId INTEGER,
      productId INTEGER
    )
  `);

  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT,
      password TEXT
    )
  `);
  
  console.log('Base de datos inicializada');
}

module.exports = { connect, init };
