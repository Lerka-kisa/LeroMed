const ApiError = require('../error/apiError')
const TokenService = require('../services/tokenService')

module.exports = function (req, res, next) {
    if(req.method === "OPTIONS") {
        next()
    }
    try{
        const token = req.headers.authorization.split(' ')[1]
        if(!token)
            return next(ApiError.UnauthorizedError())
        const authData = TokenService.validateAccessToken(token)
        if (!authData)
            return next(ApiError.UnauthorizedError())
        req.user_info = authData
        next()
    } catch (e) {
        return next(ApiError.UnauthorizedError())
    }
}