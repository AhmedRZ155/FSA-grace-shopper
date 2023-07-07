const express = require('express');
const router = express.Router();

const auth = require('./auth.js');
const {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../db/products');
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

router.post('/', auth, async (req, res, next) => {
  if (req.user?.type !== 'admin') {
    return next({
      name: 'AuthorizationHeaderError',
      message: 'You must be an admin to perform this action',
    });
  }

  try {
    const { name, description, price, type, category, quantity, urls } =
      req.body;

    const product = await createProduct({
      name,
      description,
      price,
      type,
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

router.patch('/:productId', auth, async (req, res, next) => {
  if (req.user.type !== 'admin') {
    return next({
      name: 'AuthorizationHeaderError',
      message: 'You must be an admin to perform this action',
    });
  }

  try {
    const { productId } = req.params;
    const { name, description, price, type, category, quantity, urls } =
      req.body;
    const product = await updateProduct({
      productId,
      name,
      description,
      price,
      type,
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

router.delete('/:productId', auth, async (req, res, next) => {
  if (req.user.type !== 'admin') {
    return next({
      name: 'AuthorizationHeaderError',
      message: 'You must be an admin to perform this action',
    });
  }

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
