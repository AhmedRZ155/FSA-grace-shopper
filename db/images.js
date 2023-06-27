const client = require('./index');

async function createImage(productId, url) {
  try {
    const { rows } = await client.query(
      `
        INSERT INTO images ("productId", url)
        VALUES ($1, $2)
        RETURNING *;
      `,
      [productId, url]
    );

    return rows[0];
  } catch (error) {
    console.error(error);
  }
}

async function getImagesByProductId(productId) {
  try {
    const { rows } = await client.query(
      `
        SELECT url 
        FROM images
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

async function updateImagesByProductID(productId, urls) {
  try {
    await deleteImagesByProductId(productId);

    if (urls.length > 0) {
      const photos = await Promise.all(
        urls.map(url => createPhoto(productId, url))
      );
      return photos;
    }

    return [];
  } catch (error) {
    console.error(error);
  }
}

async function deleteImagesByProductId(productId) {
  try {
    await client.query(
      `
        DELETE FROM images
        WHERE "productId"=$1;
      `,
      [productId]
    );
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  createImage,
  getImagesByProductId,
  updateImagesByProductID,
  deleteImagesByProductId,
};
