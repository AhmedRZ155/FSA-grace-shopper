const client = require('./index');

async function createReview({ content, productId, userId }) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO reviews (content, "productId", "userId")
        VALUES ($1, $2, $3)
        RETURNING *;
      `,
      [content, productId, userId]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function getReviewsByProductId(productId) {
  try {
    const { rows } = await client.query(
      `
        SELECT review.id, review.content, review."userId", users.name 
        FROM reviews
        JOIN users ON users.id=reviews."userId"
        WHERE "productId"=$1;
      `,
      [productId]
    );
    if (rows <= 0) {
      return [];
    }

    return rows;
  } catch (error) {
    console.error(error);
  }
}

async function deleteReviewsByProductId(productId) {
  try {
    await client.query(
      `
        DELETE FROM reviews
        WHERE "productId"=$1;
      `,
      [productId]
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createReview,
  getReviewsByProductId,
  deleteReviewsByProductId,
};
