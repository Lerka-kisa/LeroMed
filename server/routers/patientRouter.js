const Router = require("express").Router;
const patientController = require("../controllers/patientController");
const patient = new Router();
const AuthMiddleware = require('../middlewares/authMiddleware')

patient.get('/get_info', AuthMiddleware, patientController.getInfo)
patient.post('/set_info', AuthMiddleware, patientController.setInfo)

module.exports = patient;