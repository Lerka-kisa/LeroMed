const model = require("../models/models");
const ApiError = require("../error/apiError");
const PatientDto = require("../dto/patientDto");
const {Sequelize} = require("sequelize");


class PatientService {
    getIdAddress = async (city, street, house) =>{
        const address = await model.Addresses.findOne({
                where: [{city}, {street}, {house}]
            }
        )
        if(!address) {
            throw ApiError.BadRequest('Sorry, this address is out of our service area. Check it, please.')
        }
        return address.id
    }
    getIdAgegroup = async (birthday) => {
        const age = ((new Date() - new Date(birthday)) / (24 * 3600 * 365.25 * 1000)) | 0;
        const age_group = await model.Age_group.findOne(
            {where:{
                    max:{[Sequelize.Op.gt]:age},
                    min:{[Sequelize.Op.lte]:age}}
            }
        )
        if(!age_group) throw ApiError.BadRequest('Check your birthday, please')
        return age_group.id
    }
    async getInfo(id){
        const patient_info = await model.Patients.findByPk(id, {
            include:[
                { model: model.Authorization_info, required: true },
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
    async setInfo(id, body){
        let {last_name, first_name, middle_name, id_gender, birthday, place_of_work, city, street, house, flat} = body
        const id_address = await this.getIdAddress(city, street, house);
        const id_agegroup = await this.getIdAgegroup(birthday);
        const patientInfo = await model.Patients.update({
                last_name,
                first_name,
                middle_name,
                id_gender,
                birthday,
                id_agegroup,
                flat,
                place_of_work,
                id_address
            }, {
                where:{id}
            }
        )
        if(!patientInfo) throw ApiError.BadRequest()
        return patientInfo
    }
}

module.exports = new PatientService()