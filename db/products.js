const client = require('./index');

async function createProduct({ name, description, price, quantity }) {
  try {
    const { rows } = client.query(
      `
        INSERT INTO products (name, description, price, quantity)
        VALUE ($1, $2, $3, $4)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
      `,
      [name, description, price, quantity]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  createProduct,
};
