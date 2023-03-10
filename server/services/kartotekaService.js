const model = require("../models/models");
const ApiError = require("../error/apiError");
const PatientDto = require("../dto/patientDto");

class KartotekaService {
    async getInfo(id){
        const patient_info = await model.Patients.findByPk(id, {
            include:[
                { model: model.Authorization_info, required: true, attributes:[ "login", "email", "phone" ]  },
                { model: model.Medical_cards, required: true,
                    include:[{ model: model.Card_status, required: true }]
                },
                { model: model.Gender, required: false },
                { model: model.Age_group, required: false},
                { model: model.Addresses, required: false}
            ]
        })
        if(!patient_info){
            throw ApiError.NotFound();
        }
        const patientDto = new PatientDto(patient_info);
        return {patient_info: patientDto}
    }
    async getAllPatients(){
        const patient_info = await model.Patients.findAll( {
            include:[
                { model: model.Authorization_info, required: true, attributes:[ "login", "email", "phone" ] },
                { model: model.Medical_cards, required: true,
                    include:[{ model: model.Card_status, required: true }]
                },
                { model: model.Gender, required: false },
                { model: model.Age_group, required: false},
                { model: model.Addresses, required: false}
            ]
        })
        if(!patient_info){
            throw ApiError.BadRequest()
        }

        let patientsDto = []
        patient_info.forEach(el => {
            patientsDto.push(new PatientDto(el.dataValues))
        })

        return {patient_info: patientsDto}
    }
}

module.exports = new KartotekaService()