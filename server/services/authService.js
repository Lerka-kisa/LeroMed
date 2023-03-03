const model = require("../models/models");
const sequelize = require('../db');
const TokenService = require('../services/tokenService')
const MailService = require('../services/mailService')
const AuthDto = require('../dto/authDto')
const bcrypt = require("bcrypt");
const uuid = require('uuid')
const ApiError = require("../error/apiError");

class AuthService {
    async registration(body){
        let {login, password, email, phone} = body
        // bankInfo = bankInfo || null
        // address = address || null
        const candidate_email = await model.Authorization_info.findOne({where: {email}})
        if (candidate_email)
            //throw ApiError.BadRequest('Exist email')
            throw new Error('Exist email')

        const candidate_login = await model.Authorization_info.findOne({where: {login}})
        if (candidate_login)
            //throw ApiError.BadRequest('Exist email')
            throw new Error('Exist login')

        const candidate_phone = await model.Authorization_info.findOne({where: {phone}})
        if (candidate_phone)
            throw ApiError.BadRequest('Exist email')
            //throw new Error('Exist phone')

        const hash_password = await bcrypt.hash(password, 5)
        const activation_link = uuid.v4()
        //const t = await sequelize.transaction();
        try {
            const auth_info = await model.Authorization_info.create({
                login,
                hash_password,
                email,
                phone,
                activation_link,
                is_activated: false,
                role: 'PATIENT'
            }/*, {transaction: t}*/)
            console.log(`New user has been created with Id: ${auth_info.id}`);

            let card_number = "not_number_" + auth_info.id;
            const medcard = await model.Medical_cards.create({
                card_number,
                card_status: 1
            }/*, {transaction: t}*/)
            console.log(`New users medical card has been created with Id: ${medcard.id} and registered with the ${card_number} number`);

            const patient = await model.Patients.create({
                id_auth: auth_info.id,
                id_medcard: medcard.id
            }/*, {transaction: t}*/)
            console.log(`New patient has been created with Id: ${patient.id}`);

            //return{message:"kokokoko"}
            await MailService.sendActivationMail(email, `${process.env.API_URL}/users/activate/${activation_link}`)
            //await t.commit()
            console.log(`Activate message has been sent`);

            const authDto = new AuthDto(auth_info, patient.id);
            const tokens = TokenService.generateTokens({...authDto});
            await TokenService.saveToken(authDto.id, tokens.refreshToken);

            return {...tokens, auth_info: authDto}
        }catch (e){
            //await t.rollback()
            console.log(`Registration error: ${e.message}`)
            //throw new ApiError.BadRequest('Error registration')
            throw new Error('Error registration')
        }
    }

}

module.exports = new AuthService()