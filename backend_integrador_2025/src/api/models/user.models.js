import db from '../database/db.js';

const UserModel = {
  async findByEmail(email, contraseña) {
    
    const [rows] = await db.query(
      'SELECT * FROM users WHERE email = ? AND password = ?',

      [email, contraseña]
    );

    console.log(rows);

    return rows[0];
  },

  async create(email, hashedPassword) {
    await db.query(
      'INSERT INTO users (email, password) VALUES (?, ?)',
      [email, hashedPassword]
    );
  }
};

export default UserModel;
