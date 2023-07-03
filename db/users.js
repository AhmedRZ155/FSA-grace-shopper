const client = require('./index');
const bcrypt = require('bcrypt');

// User Functions:
// createUser | getUser | getUserById | getUserByUsername

async function createUser({ email, name, password }) {
  try {
    const SALT_COUNT = 10;
    const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

    const {
      rows: [user],
    } = await client.query(
      `
      INSERT INTO users (email, name, password)
      VALUES ($1, $2, $3)
      ON CONFLICT (email) DO NOTHING
      RETURNING *;
    `,
      [email, name, hashedPassword]
    );

    if (user) {
      delete user.password;
      return user;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUser({ email, password }) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE email = $1;
    `,
      [email]
    );

    const passwordCheck = await bcrypt.compare(password, user.password);

    if (passwordCheck) {
      delete user.password;
      return user;
    }
  } catch (error) {
    console.log(error);
  }
}

async function getUserById(userId) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE id = $1;
    `,
      [userId]
    );

    delete user.password;
    return user;
  } catch (error) {
    console.log(error);
  }
}

async function getUserByEmail(email) {
  try {
    const {
      rows: [user],
    } = await client.query(
      `
      SELECT * FROM users
      WHERE email = $1;
    `,
      [email]
    );

    if (user) {
      return user;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
};
