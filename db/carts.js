const { getImagesByProductId } = require('./images');
const client = require('./index');
const { getReviewsByProductId } = require('./reviews');

async function addProductToCart({ userId, productId, quantity }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO carts("userId", "productId", quantity)
        VALUES ($1, $2, $3)
        ON CONFLICT ("userId", "productId") DO NOTHING;
      `,
      [userId, productId, quantity]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function getCartByUserId(userId) {
  try {
    const { rows } = await client.query(
      `
        SELECT carts."productId" as id, carts.quantity,
        products.name, products.description, products.price,
        products.type, products.category
        FROM carts
        JOIN products 
        ON carts."productId"=products.id
        WHERE "userId"=$1
      `,
      [userId]
    );

    const carts = await Promise.all(
      rows.map(async product => {
        product.images = await getImagesByProductId(product.id);
        product.reviews = await getReviewsByProductId(product.id);
        return product;
      })
    );

    return carts;
  } catch (error) {
    console.error(error);
  }
}

async function getProductInCart({ userId, productId }) {
  try {
    const { rows } = await client.query(
      `
        SELECT * 
        FROM carts
        WHERE "userId"=$1
        AND "productId"=$2;
      `,
      [userId, productId]
    );

    if (rows.length > 0) {
      return rows[0];
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
  }
}

async function updateProductInCart({ userId, productId, quantity }) {
  try {
    const { rows } = await client.query(
      `
      UPDATE carts
      SET quantity=$3
      WHERE "userId"=$1
      AND "productId"=$2
      RETURNING *;
    `,
      [userId, productId, quantity]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function removeProductInCart({ userId, productId }) {
  try {
    const { rows } = await client.query(
      `
        DELETE FROM carts
        WHERE "productId"=$2
        AND "userId"=$1
        RETURNING *;
      `,
      [userId, productId]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  addProductToCart,
  getCartByUserId,
  getProductInCart,
  updateProductInCart,
  removeProductInCart,
};
