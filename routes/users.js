const express = require("express");
const usersRouter = express.Router();
const jwt = require('jsonwebtoken');
const auth = require ('./auth.js');
const { JWT_SECRET } = process.env;

const {
    createUser,
    getUserByEmail,
    getUser,
    getUserById,
} = require('../db');

// Check router working:
usersRouter.use((req, res, next) => {
    console.log("A request is being made to users");
    next();
});

// POST /api/users/register
usersRouter.post('/register', async (req, res, next) =>{
    const { email, name, password } = req.body;

    if (!email || !name || !password) {
        next({
            name: 'MissingCredentialsError',
            message: 'Need to supply both a username and password'
        });
    }

    if(password.length < 8){
        next({
            name: 'PasswordTooShort',
            message: 'Password Too Short!',
        });
    }

    try{
        const isAlreadyUser = await getUserByEmail(email);

        if(isAlreadyUser){
            next({
                name: 'UserAlreadyExistsError',
                message: `User ${isAlreadyUser.email} is already taken.`,
            });
        }

        const user = await createUser(req.body);

        const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, {expiresIn: '1w'});

        res.send({
            success: true,
            error: null,
            message: 'Thanks for signing up for our service',
            data: {
                email,
                name,
                type: user.type,
                token
            }
        });

    }catch(error){
       console.log(error);
    }
});

// POST /api/users/login
usersRouter.post('/login', async (req, res, next) => {
    const { username, password} = req.body;

    try {
        const user = await getUser({ username, password });

        const token = jwt.sign({ id: user.id, username }, process.env.JWT_SECRET, { expiresIn: '1w' });

        if (user) {
            res.send({
                message: "you're logged in!",
                token,
                user
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
            const user = await getUserById(req.user.id);

            res.send(user);
        } else {
            next({
                name: "NotLoggedIn",
                message: "You must be logged in to perform this action",
            });
        }
    } catch (error) {
        console.log(error);
    }
});

module.exports = usersRouter;