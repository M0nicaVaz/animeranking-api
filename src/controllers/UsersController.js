const sqlConnection = require('../database/sqlite');
const { hash, compare } = require('bcryptjs');

const AppError = require('../utils/AppError');

class UsersController {
  async create(req, res) {
    const { name, email, password } = req.body;

    const database = await sqlConnection();

    const userExists = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    if (userExists) {
      throw new AppError('Esse email já está cadastrado!');
    }

    const hashedPassword = await hash(password, 8);

    database.run('INSERT INTO users (name, email, password) VALUES (?, ?, ?)', [
      name,
      email,
      hashedPassword,
    ]);

    return res.status(201).json();
  }

  async update(req, res) {
    const { name, email, password, old_password } = req.body;

    const { id } = req.params;

    const database = await sqlConnection();

    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id]);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    );

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este email já está cadastrado.');
    }

    user.name = name ?? user.name;
    user.email = email ?? user.email;

    if (password && !old_password) {
      throw new AppError('Insira a senha antiga!');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('A senha antiga não confere.');
      }

      user.password = await hash(password, 8);
    }

    await database.run(
      `UPDATE users SET name = ?, email = ?, password = ?,  updated_at = DATETIME('now') WHERE id = ?`,
      [user.name, user.email, user.password, id]
    );

    return res.json();
  }
}

module.exports = UsersController;
