import bcrypt from 'bcrypt'
import TokenService from "./token-service.js";
import User from "../models/user-model.js";
import ApiError from "../exceptions/api-error.js";



class UserService {
    async login(email, password, ipAddress) {
        const user = await User.findOne({where: {email}});

        if (!user) {
            throw new ApiError.BadRequest("Пользователь с таким email не найден")
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new ApiError.BadRequest("Неверный пароль")
        }

        if (user.addressIP !== ipAddress) {
            throw new ApiError.BadRequest("Неверный IP");
        }
         const payload = {userId: user.userId, name: user.name, role: user.role}
        const tokens = TokenService.generateTokens(payload)
        await TokenService.saveToken(user.userId, tokens.refreshToken)
        return {...tokens, user: payload}
    }

    async logout(refreshToken) {
        return await TokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw new ApiError.UnauthorizedError()
        }
        const userData = TokenService.validateRefreshToken(refreshToken)
        const tokenFromDB = await TokenService.findToken(refreshToken)
        if (!userData || !tokenFromDB) {
            throw new ApiError.UnauthorizedError()
        }
        const user = await User.findOne({where: {userId: userData.userId}});
        const payload = {userId: user.userId, name: user.name, role: user.role}
        const tokens = TokenService.generateTokens(payload)
        await TokenService.saveToken(user.userId, tokens.refreshToken)
        return {...tokens, user: payload}

    }
}

export default new UserService()