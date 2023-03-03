const Router = require("express").Router;
const authController = require("../controllers/authController");
const authRouter = new Router();

authRouter.post('/registration', authController.registration);
authRouter.post('/login', authController.login);
authRouter.post('/logout', authController.logout);
authRouter.get('/activate/:link', authController.activate);
authRouter.get('/refresh', authController.refresh);
authRouter.get('/users', authController.getUsers);

module.exports = authRouter;