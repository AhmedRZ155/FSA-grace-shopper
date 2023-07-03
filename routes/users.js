const express = require('express');
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const auth = require('./auth.js');
const { JWT_SECRET } = process.env;

const { createUser, getUserByEmail, getUser } = require('../db/users');

// Check router working:
usersRouter.use((req, res, next) => {
  console.log('A request is being made to users');
  next();
});

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) => {
  const { email, name, password } = req.body;

  if (!email || !name || !password) {
    return next({
      name: 'MissingCredentialsError',
      message: 'Need to supply both a email and password',
    });
  }

  if (password.length < 8) {
    return next({
      name: 'PasswordTooShort',
      message: 'Password Too Short!',
    });
  }

  try {
    const isAlreadyUser = await getUserByEmail(email);

    if (isAlreadyUser) {
      return next({
        name: 'UserAlreadyExistsError',
        message: `User ${isAlreadyUser.email} is already taken.`,
      });
    }

    const user = await createUser(req.body);

    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
      // expiresIn: '1w',
    });

    res.send({
      success: true,
      error: null,
      message: 'Thanks for signing up for our service',
      data: {
        email,
        name,
        type: user.type,
        token,
      },
    });
  } catch (error) {
    console.log(error);
  }
});

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await getUser({ email, password });

    const token = jwt.sign({ id: user.id, email }, JWT_SECRET, {
      // expiresIn: '1w',
    });

    if (user) {
      res.send({
        success: true,
        error: null,
        message: "You're logged in!",
        data: {
          email,
          name: user.name,
          type: user.type,
          token,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// GET /api/users/me
usersRouter.get('/me', auth, async (req, res, next) => {
  try {
    if (req.user) {
      const { id, email, name, type } = req.user;

      res.send({
        success: true,
        message: `Success fetch user information`,
        error: null,
        data: {
          id,
          email,
          name,
          type,
        },
      });
    } else {
      next({
        name: 'NotLoggedIn',
        message: 'You must be logged in to perform this action',
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = usersRouter;
