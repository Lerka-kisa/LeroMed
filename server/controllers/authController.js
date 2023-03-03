const AuthService = require('../services/authService');

class AuthController {
    async registration(req, res, next){
        try{
            // const errors = validationResult(req)
            // if (!errors.isEmpty()) {
            //     return next(ApiError.BadRequest('Validation error: ' +  errors.array()[0].msg.toString()))
            // }
            const authData = await AuthService.registration(req.body);
            //res.cookies('refreshToken', authData.refreshToken, {maxAge: 30*24*60*60*1000, httpOnly});
            return res.json(authData)
        } catch (e) {
            console.log(e)
        }
    }

    async login(req, res, next){
        try{

        } catch (e) {

        }
    }

    async logout(req, res, next){
        try{

        } catch (e) {

        }
    }

    async activate(req, res, next){
        try{

        } catch (e) {

        }
    }

    async refresh(req, res, next){
        try{

        } catch (e) {

        }
    }

    async getUsers(req, res, next){
        try{
            res.json(['11', '111', '1111'])
        } catch (e) {

        }
    }
}

module.exports = new AuthController();