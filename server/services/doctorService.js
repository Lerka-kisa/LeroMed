const model = require("../models/models");
const ApiError = require("../error/apiError");

class DoctorService {
    async getInfo(id){
        const doctor_info = await model.Doctors.findByPk(id, {
            include:[
                { model: model.Authorization_info, required: true, attributes:[ "login", "email", "phone" ]  },
                { model: model.Specializations, required: false},
                { model: model.Sectors, required: false}
            ]
        })
        if(!doctor_info){
            throw ApiError.NotFound();
        }

        return doctor_info
    }
    async setInfo(id, body){
        let {last_name, first_name, middle_name, id_specialization} = body

        const doctorInfo = await model.Doctors.update({
                last_name,
                first_name,
                middle_name,
                id_specialization
            }, {
                where:{id}
            }
        )
        if(!doctorInfo) throw ApiError.BadRequest()
        return doctorInfo
    }
}

module.exports = new DoctorService()