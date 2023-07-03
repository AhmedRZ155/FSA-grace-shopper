const jwt = require('jsonwebtoken');
const { getUserById } = require('../db/users');
const { JWT_SECRET } = process.env;

// check authentication middleware, get token, get user info. check token & whether user is admin or not
const auth = async (req, res, next) => {
  const prefix = 'Bearer ';
  const auth = req.header('Authorization');

  if (!auth) {
    next();
  } else if (auth.startsWith(prefix)) {
    const token = auth.slice(prefix.length); // taking out 'Bearer' wording

    try {
      const parsedToken = jwt.verify(token, JWT_SECRET); //verify token is actually a user. On that token, actually exists some data about the user.

      // After we verify & get the data off of the token, we go look inside db to see if we can find that user. If we find that user, we want to save on the req object. If does not exist, then will not put anything on req object.
      const id = parsedToken && parsedToken.id;
      if (id) {
        req.user = await getUserById(id); // on the req object, creating a new variable called 'user' which contains the name of user, id number, etc.
        next();
      }
    } catch (error) {
      next(error);
    }
  } else {
    next({
      name: 'AuthorizationHeaderError',
      message: `Authorization token must start with ${prefix}`,
    });
  }
};

module.exports = auth;
