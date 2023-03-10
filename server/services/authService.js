const model = require("../models/models");
const TokenService = require('../services/tokenService')
const MailService = require('../services/mailService')
const AuthDto = require('../dto/authDto')
const bcrypt = require("bcrypt");
const uuid = require('uuid')
const ApiError = require("../error/apiError");
const Sequelize = require("sequelize");

class AuthService {
    getIdAccount = async (role, id_auth) => {
        switch(role) {
            case 'PATIENT':
                const patient = await model.Patients.findOne({where:{id_auth}})
                return patient.id;
            case 'DOCTOR':
                const doctor = await model.Doctors.findOne({where:{id_auth}})
                return doctor.id;
            default:
                return 0;
        }
    }
    employmentCheck = async(login, email, phone) => {
        const candidate_email = await model.Authorization_info.findOne({where: {email}})
        if (candidate_email)
            throw ApiError.BadRequest('Exist email')

        const candidate_login = await model.Authorization_info.findOne({where: {login}})
        if (candidate_login)
            throw ApiError.BadRequest('Exist login')

        const candidate_phone = await model.Authorization_info.findOne({where: {phone}})
        if (candidate_phone)
            throw ApiError.BadRequest('Exist phone')
    }

    async patientRegistration(body){
        let {login, password, email, phone} = body

        await this.employmentCheck(login, email, phone);

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

            await MailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activation_link}`)
            //await t.commit()
            console.log(`Activate message has been sent`);

            const authDto = new AuthDto(auth_info, patient.id);
            const tokens = TokenService.generateTokens({...authDto});
            await TokenService.saveToken(authDto.id, tokens.refreshToken);

            return {...tokens, auth_info: authDto}
        }catch (e){
            //await t.rollback()
            console.log(`Registration error: ${e.message}`)
            throw new ApiError.BadRequest('Error registration')
        }
    }

    async doctorRegistration(body){
        let {login, password, email, phone} = body

        await this.employmentCheck(login, email, phone);

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
                role: 'DOCTOR'
            }/*, {transaction: t}*/)
            console.log(`New doctor has been created with Id: ${auth_info.id}`);

            const doctor = await model.Doctors.create({
                id_auth: auth_info.id
            }/*, {transaction: t}*/)
            console.log(`New doctor has been created with Id: ${doctor.id}`);

            await MailService.sendActivationMail(email, `${process.env.API_URL}/auth/activate/${activation_link}`)
            //await t.commit()
            console.log(`Activate message has been sent`);

            const authDto = new AuthDto(auth_info, doctor.id);
            const tokens = TokenService.generateTokens({...authDto});
            await TokenService.saveToken(authDto.id, tokens.refreshToken);

            return {...tokens, auth_info: authDto}
        }catch (e){
            //await t.rollback()
            console.log(`Registration error: ${e.message}`)
            throw new ApiError.BadRequest('Error registration')
        }
    }

    async activate(activation_link){
        const user = await model.Authorization_info.findOne({where: {activation_link}})
        if(!user)
            throw ApiError.BadRequest('Invalid activation link')
        await model.Authorization_info.update({is_activated: true}, {where: {id: user.id}})
    }

    async login(body) {
        const auth_info = await model.Authorization_info.findOne({
            where:{
                [Sequelize.Op.or]:[{login: body.login}, {email: body.login}, {phone: body.login}]
            }
        })
        if(!auth_info){
            throw ApiError.BadRequest('User not found');
        }
        if (!auth_info.is_activated)
            throw ApiError.BadRequest('Inactive account');
        let comparePassword = bcrypt.compareSync(body.password, auth_info.hash_password)
        if (!comparePassword)
            throw ApiError.BadRequest('Invalid password');
        const id_account = await this.getIdAccount(auth_info.role, auth_info.id)
        const authDto = new AuthDto(auth_info, id_account);
        const tokens = TokenService.generateTokens({...authDto});
        await TokenService.saveToken(authDto.id, tokens.refreshToken);

        return {...tokens, auth_info: authDto}
    }

    async logout(refresh_token) {
        return await TokenService.removeToken(refresh_token);
    }

    async refresh(refresh_token){
        if (!refresh_token)
            throw ApiError.UnauthorizedError()
        const authData = TokenService.validateRefreshToken(refresh_token)
        const tokenFromDB = await TokenService.findToken(refresh_token)
        if (!authData || !tokenFromDB){
            throw ApiError.UnauthorizedError()
        }
        const auth_info = await model.Authorization_info.findByPk(authData.id)
        const id_account = await this.getIdAccount(auth_info.role, auth_info.id)
        const authDto = new AuthDto(auth_info, id_account);
        const tokens = TokenService.generateTokens({...authDto});
        await TokenService.saveToken(authDto.id, tokens.refreshToken);

        return {...tokens, auth_info: authDto}
    }

    async getAllAuthInfo(){
        return await model.Authorization_info.findAll();
    }
}

module.exports = new AuthService()