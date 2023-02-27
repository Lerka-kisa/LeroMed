const express = require("express");
//const authController = require("../controllers/authController");
const authRouter = new express.Router();

authRouter.post('/registration');
authRouter.post('/login');
authRouter.post('/logout');
authRouter.get('/activate/:link');
authRouter.get('refresh');
authRouter.get('users');

module.exports = authRouter;