const jwt = require("jsonwebtoken");
const model = require("../models/models");

class TokenService {
    generateTokens (payload) {
        const accessToken = jwt.sign( payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: "1h"})
        const refreshToken = jwt.sign( payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: "30d"})
        return {accessToken, refreshToken}
    }

    validateAccessToken(token){
        try{
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
        }catch (e) {
            return null
        }
    }

    validateRefreshToken(token){
        try{
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
        } catch (e) {
            return null
        }
    }

    async saveToken(id_auth, refresh_token){
        let token = await model.Tokens.findOne({where: {id_auth}})
        if(token){
            await model.Tokens.update({ refresh_token: refresh_token }, {
                where: {id_auth: id_auth}
            });
        } else{
            await model.Tokens.create({id_auth, refresh_token});
        }
    }

    async removeToken(refresh_token){
        return await model.Tokens.destroy({where: {refresh_token}})
    }

    async findToken(refresh_token){
        return await model.Tokens.findOne({where: {refresh_token}})
    }
}

module.exports = new TokenService()