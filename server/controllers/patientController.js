const PatientService = require('../services/patientService');
const ApiError = require("../error/apiError");
class PatientController {
    async getInfo(req, res, next){
        try{
            if(req.user_info.role !== 'PATIENT') return next(ApiError.Forbidden());
            const patientData = await PatientService.getInfo(req.user_info.id_acc);
            return res.json(patientData)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async setInfo(req, res, next){
        try{
            if(req.user_info.role !== 'PATIENT') return next(ApiError.Forbidden());
            const patientData = await PatientService.setInfo(req.user_info.id_acc, req.body);
            return res.json(patientData);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

module.exports = new PatientController();