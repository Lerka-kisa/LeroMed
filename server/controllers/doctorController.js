const DoctorService = require('../services/doctorService');
const ApiError = require("../error/apiError");

class DoctorController {
    async getInfo(req, res, next){
        try{
            if(req.user_info.role !== 'DOCTOR') return next(ApiError.Forbidden());
            const patientData = await DoctorService.getInfo(req.user_info.id_acc);
            return res.json(patientData)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async setInfo(req, res, next){
        try{
            if(req.user_info.role !== 'DOCTOR') return next(ApiError.Forbidden());
            const patientData = await DoctorService.setInfo(req.user_info.id_acc, req.body);
            return res.json(patientData);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

module.exports = new DoctorController();