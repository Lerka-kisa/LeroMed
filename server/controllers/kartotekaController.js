const KartotekaService = require('../services/kartotekaService');
const ApiError = require("../error/apiError");

class KartotekaController {
    async getInfo(req, res, next){
        try{
            if((req.user_info.role === 'ADMIN')||(req.user_info.role === 'DOCTOR')){
                const patientList = await KartotekaService.getAllPatients();
                return res.json(patientList)
            } else{
                return next(ApiError.Forbidden());
            }

        } catch (e) {
            console.log(e);
            next(e);
        }
    }
    async getInfoById(req, res, next){
        try{
            if((req.user_info.role === 'ADMIN')||(req.user_info.role === 'DOCTOR')){
                const patientData = await KartotekaService.getInfo(req.params.id_patient);
                return res.json(patientData)
            } else{
                return next(ApiError.Forbidden());
            }

        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

module.exports = new KartotekaController();