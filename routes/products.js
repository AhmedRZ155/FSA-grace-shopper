const express = require('express');
const router = express.Router();

const { getProducts, createProduct } = require('../db/products');
const { createImage, updateImagesByProductID } = require('../db/images');

router.get('/', async (req, res, next) => {
  try {
    const products = await getProducts();

    res.status(200).json({
      success: true,
      error: null,
      message: 'Success fetch all products',
      data: products,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, description, price, category, quantity, urls } = req.body;

    const product = await createProduct({
      name,
      description,
      price,
      category,
      quantity,
    });

    product.photos = [];

    if (urls.length > 0) {
      const photos = await Promise.all(
        urls.map(url => createImage(product.id, url))
      );
      product.photos = photos;
    }

    res.status(200).json({
      success: true,
      error: null,
      message: 'Success create new product',
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

router.patch('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const { name, description, price, category, quantity, urls } = req.body;
    const product = await updateProduct({
      productId,
      name,
      description,
      price,
      category,
      quantity,
    });

    product.photos = await updateImagesByProductID(productId, urls);

    res.status(200).json({
      success: true,
      error: null,
      message: 'Success update product',
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:productId', async (req, res, next) => {
  try {
    const { productId } = req.params;
    const _product = await deleteProduct(productId);

    res.status(200).json({
      success: true,
      error: null,
      message: 'Success delete product',
      data: _product,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
