const Router = require("express").Router;
const doctorController = require("../controllers/doctorController");
const doctor = new Router();
const AuthMiddleware = require('../middlewares/authMiddleware')

doctor.get('/get_info', AuthMiddleware, doctorController.getInfo)
doctor.post('/set_info', AuthMiddleware, doctorController.setInfo)

module.exports = doctor;