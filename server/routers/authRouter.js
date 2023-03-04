const Router = require("express").Router;
const authController = require("../controllers/authController");
const authRouter = new Router();
const {body} = require('express-validator')
const AuthMiddleware = require('../middlewares/authMiddleware')

authRouter.post('/registration',
    body('email', "invalid email").isEmail(),
    body('password').isLength({min:3, max:32}).isString(),
    body('phone', 'invalid phone number').custom((val) => {
        if (!val.match('^[+][0-9]{1,4}[\\]([0-9]{1,4}[)][0-9]{3}[-][0-9]{2}[-][0-9]{2}')) {
            throw new Error("invalid phone number")
        } else {
            return val
        }
    }),
    authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/activate/:link', authController.activate);
authRouter.get('/refresh', authController.refresh);
authRouter.get('/users', AuthMiddleware, authController.getUsers);

module.exports = authRouter;