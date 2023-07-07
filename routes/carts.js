const express = require('express');
const router = express.Router();
const auth = require('./auth.js');
const {
  getProductInCart,
  updateProductInCart,
  addProductToCart,
  getCartByUserId,
  removeProductInCart,
} = require('../db/carts.js');

router.post('/', auth, async (req, res, next) => {
  if (!req.user) {
    return next({
      name: 'AuthorizationHeaderError',
      message: 'You must be logged in to perform this action',
    });
  }

  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    const _productInCart = await getProductInCart({ userId, productId });
    if (_productInCart) {
      await updateProductInCart({
        userId,
        productId,
        quantity: quantity + _productInCart.quantity,
      });
    } else {
      await addProductToCart({ userId, productId, quantity });
    }

    const cart = await getCartByUserId(userId);

    res.status(200).json({
      success: true,
      error: null,
      message: 'Success add new product in cart',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
});

// router.get('/me', auth, async (req, res, next) => {
//   if (!req.user) {
//     return next({
//       name: 'AuthorizationHeaderError',
//       message: 'You must be logged in to perform this action',
//     });
//   }

//   try {
//     const userId = req.user.id;
//     const cart = await getCartByUserId(userId);

//     res.status(200).json({
//       success: true,
//       message: `Success fetch user cart`,
//       error: null,
//       data: cart,
//     });
//   } catch (error) {
//     next(error);
//   }
// });

router.patch('/', auth, async (req, res, next) => {
  if (!req.user) {
    return next({
      name: 'AuthorizationHeaderError',
      message: 'You must be the owner to perform this action',
    });
  }

  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    await updateProductInCart({
      userId,
      productId,
      quantity,
    });

    const cart = await getCartByUserId(userId);

    res.status(200).json({
      success: true,
      message: `Success update product in cart`,
      error: null,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/', auth, async (req, res, next) => {
  if (!req.user) {
    return next({
      name: 'AuthorizationHeaderError',
      message: 'You must be the owner to perform this action',
    });
  }

  try {
    const userId = req.user.id;
    const { productId } = req.body;

    await removeProductInCart({ userId, productId });

    const cart = await getCartByUserId(userId);

    res.status(200).json({
      success: true,
      message: `Success remove product from cart`,
      error: null,
      data: cart,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
