const AuthService = require('../services/authService');
const {validationResult} = require("express-validator");
const ApiError = require("../error/apiError");

class AuthController {
    async patientRegistration(req, res, next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const authData = await AuthService.patientRegistration(req.body);
            res.cookie('refreshToken', authData.refreshToken, { httpOnly: true, sameSite: 'strict'});
            return res.json(authData)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
    async doctorRegistration(req, res, next){
        try{
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return next(ApiError.BadRequest('Validation error', errors.array()))
            }
            const authData = await AuthService.doctorRegistration(req.body);
            res.cookie('refreshToken', authData.refreshToken, { httpOnly: true, sameSite: 'strict'});
            return res.json(authData)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async login(req, res, next){
        try{
            const authData = await AuthService.login(req.body);
            res.cookie('refreshToken', authData.refreshToken, { httpOnly: true, sameSite: 'strict'});
            return res.json(authData)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async logout(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const token = await AuthService.logout(refreshToken);
            res.clearCookie('refreshToken')
            return res.json(token);
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async activate(req, res, next){
        try {
            const activateLink = req.params.link
            await AuthService.activate(activateLink)
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async refresh(req, res, next){
        try{
            const {refreshToken} = req.cookies;
            const authData = await AuthService.refresh(refreshToken);
            res.cookie('refreshToken', authData.refreshToken, { httpOnly: true, sameSite: 'strict'});
            return res.json(authData)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }

    async getUsers(req, res, next){
        try{
            const users = await AuthService.getAllAuthInfo();
            return res.json(users)
        } catch (e) {
            console.log(e);
            next(e);
        }
    }
}

module.exports = new AuthController();