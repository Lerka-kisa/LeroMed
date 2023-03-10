const Router = require("express").Router;
const kartotekaController = require("../controllers/kartotekaController");
const kartoteka = new Router();
const AuthMiddleware = require('../middlewares/authMiddleware')

kartoteka.get('/get_info/:id_patient', AuthMiddleware, kartotekaController.getInfoById)
kartoteka.get('/get_info', AuthMiddleware, kartotekaController.getInfo)

module.exports = kartoteka;