const Router = require('express').Router
const router = new Router()

const authRouter = require('./authRouter')
const patientRouter = require('./patientRouter')
const doctorRouter = require('./doctorRouter')
const kartotekaRouter = require('./kartotekaRouter')

router.use('/auth', authRouter);
router.use('/patient', patientRouter);
router.use('/doctor', doctorRouter);
router.use('/kartoteka', kartotekaRouter);

module.exports = router