const client = require('./index');
const { getImagesByProductId, deleteImagesByProductId } = require('./images');
const {
  getReviewsByProductId,
  deleteReviewsByProductId,
} = require('./reviews');

async function createProduct({
  name,
  description,
  price,
  type,
  category,
  quantity,
}) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO products (name, description, price, type, category, quantity)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT (name) DO NOTHING
        RETURNING *;
      `,
      [name, description, price, type, category, quantity]
    );

    return rows[0];
  } catch (error) {
    console.log(error);
  }
}

async function getProducts() {
  try {
    const { rows } = await client.query(
      `
        SELECT * 
        FROM products;
      `
    );

    const products = await Promise.all(
      rows.map(async product => {
        product.images = await getImagesByProductId(product.id);
        product.reviews = await getReviewsByProductId(product.id);
        return product;
      })
    );

    return products;
  } catch (error) {
    console.error(error);
  }
}

async function getProductById(productId) {
  try {
    const { rows } = await client.query(
      `
        SELECT * 
        FROM products
        WHERE id=$1;
      `,
      [productId]
    );

    const product = rows[0];

    product.images = await getImagesByProductId(productId);
    product.reviews = await getReviewsByProductId(productId);

    return product;
  } catch (error) {
    console.error(error);
  }
}

async function updateProduct({ productId, ...fields }) {
  const setString = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 2}`)
    .join(', ');

  try {
    const { rows } = await client.query(
      `
        UPDATE products
        SET ${setString}
        WHERE id=$1
        RETURNING *;
      `,
      [productId, ...Object.values(fields)]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function deleteProduct(productId) {
  try {
    await deleteImagesByProductId(productId);
    await deleteReviewsByProductId(productId);

    const { rows } = await client.query(
      `
        DELETE FROM products
        WHERE id=$1
        RETURNING *;
      `,
      [productId]
    );

    return rows[0];
  } catch (error) {}
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
