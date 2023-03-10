const model = require("../models/models");
const bcrypt = require("bcrypt");
const uuid = require("uuid");

class FunctionStart{
    async createSpecialization(specialization, one_session_time){
        await model.Specializations.create({
            specialization,
            one_session_time
        })
            .then(() =>  {
                console.log("ok")
            })
            .catch(err => {
                console.log("Specializations: not ok, because:" + err)
            })
    }
    async createCardStatus(status){
        await model.Card_status.create({status})
            .then(() =>  {
                console.log("ok")
            })
            .catch(err => {
                console.log("Card_status: not ok, because:" + err)
            })
    }
    async createMedicalCard(card_number, card_status){
        await model.Medical_cards.create({card_number:card_number, card_status:card_status})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Medical_cards: not ok, because:" + err)
            })
    }
    async createTypeOfAnalysis(type_of_analyze){
        await model.Types_of_analysis.create({name_analysis: type_of_analyze})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Types_of_analysis: not ok, because:" + err)
            })
    }
    async createAgeGroup(age_group, min, max){
        await model.Age_group.create({
            group_name: age_group,
            min: min,
            max: max
        })
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Age_group: not ok, because:" + err)
            })
    }
    async createGender(gender){
        await model.Gender.create({gender: gender})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Gender: not ok, because:" + err)
            })
    }
    async createNormScore(score){
        await model.Norms_scores.create({norm_score: score})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Norms_scores: not ok, because:" + err)
            })
    }
    async createAnalysisNorm(type, gender, agegroup, min, max, si_unit){
        model.Analysis_norms.create({id_analysis_type: type, id_gender: gender, id_agegroup: agegroup, min: min, max: max, SI_unit: si_unit  })
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Analysis_norms: not ok, because:" + err)
            })
    }
    async createAnalysisResult(id_medcard, id_analysis_type, id_norm, result, norm_score, recommendation, date){
        await model.Analysis_results.create(
            {
                id_medcard:id_medcard,
                id_analysis_type:id_analysis_type,
                id_norm:id_norm,
                result:result,
                id_norm_score:norm_score,
                date: date,
                recommendation:recommendation})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Analysis_results: not ok, because:" + err)
            })
    }
    async createMedicalRecord(id_medcard, date, record, recommendation){
        await model.Medcards_records.create(
            {
                id_medcard:id_medcard,
                date:date,
                record:record,
                recommendation:recommendation
            })
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Medcards_records: not ok, because:" + err)
            })
    }
    async createAutorizationInfo(login, password, email, phone, role){
        const hash_password = await bcrypt.hash(password, 5)
        const activation_link = uuid.v4()
        await model.Authorization_info.create(
            {
                login,
                hash_password,
                email,
                phone,
                role,
                activation_link,
                is_activated: true
            }
        )
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Authorization_info: not ok, because:" + err)
            })
    }
    async createDoctors(id_auth, first_name, last_name, middle_name, id_specialization, photo){
        await model.Doctors.create(
            {
                id_auth,
                first_name,
                last_name,
                middle_name,
                id_specialization,
                photo})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Doctors: not ok, because:" + err)
            })
    }
    async createSectors(id_doctor){
        await model.Sectors.create({id_doctor})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Sectors: not ok, because:" + err)
            })
    }
    async createAddress(id_sector, city, street, house){
        await model.Addresses.create({id_sector:id_sector, city:city, street:street, house:house})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Addresses: not ok, because:" + err)
            })
    }
    async createTypeOfShifts(type_of_shift, start, end){
        await model.Types_of_shifts.create({period_name: type_of_shift, beginning_of_period: start, end_of_period: end})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Types_of_shifts: not ok, because:" + err)
            })
    }
    async createTimetable(id_type_of_shift,id_doctor, date){
        await model.Timetable.create({id_type_of_shift:id_type_of_shift, id_doctor:id_doctor, date:date})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Timetable: not ok, because:" + err)
            })
    }
    async createPatient(id_auth, id_medcard, id_agegroup, first_name, last_name, middle_name, birthday, id_gender, id_sector, address, place_of_work, id_address){
        await model.Patients.create(
            {
                id_auth:id_auth,
                id_medcard:id_medcard,
                id_agegroup:id_agegroup,
                first_name:first_name,
                last_name:last_name,
                middle_name:middle_name,
                birthday:birthday,
                id_gender:id_gender,
                id_address:id_address,
                id_sector:id_sector,
                flat:address,
                place_of_work:place_of_work
            })
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Patients: not ok, because:" + err)
            })
    }
    async createHouseCalls(date, id_patient, remark){
        await model.House_calls.create({date:date, id_patient:id_patient, remark:remark})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("House_calls: not ok, because:" + err)
            })
    }
    async createTypeOfAppointment(type_of_appointment){
        await model.Types_of_appointments.create({name: type_of_appointment})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Types_of_appointments: not ok, because:" + err)
            })
}
    async createAppointments(id_shift, id_patient, talon_number, time){
        //const timeS = new Date(time).toLocaleTimeString()
        await model.Appointments.create({id_shift:id_shift, id_patient:id_patient, talon_number:talon_number, time:time})
            .then(() =>  console.log("ok"))
            .catch(err => {
                console.log("Appointments: not ok, because:" + err)
            })
    }
}

module.exports = new FunctionStart()