const express = require('express');
const router = express.Router();

const auth = require('./auth.js');
const { createReview } = require('../db/reviews.js');
const { getProductById } = require('../db/products.js');

router.post('/:productId', auth, async (req, res, next) => {
  if (!req.user) {
    return next({
      name: 'AuthorizationHeaderError',
      message: 'You must be logged in to perform this action',
    });
  }

  try {
    const { productId } = req.params;
    const { content } = req.body;

    await createReview({
      content,
      productId,
      userId: req.user.id,
    });

    const product = await getProductById(productId);

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

module.exports = router;
