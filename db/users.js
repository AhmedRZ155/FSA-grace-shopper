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

async function updateUser({ id, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 2}`)
    .join(', ');

  try {
    const { rows } = await client.query(
      `
        UPDATE users
        SET ${setString}
        WHERE id=$1
        RETURNING *;
      `,
      [id, ...Object.values(fields)]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  updateUser,
};
