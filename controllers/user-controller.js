import UserService from "../service/user-service.js";

class UserController {
    async login(req, res, next) {
        try {
            const { email, password, addressIP } = req.body;
            const userData = await UserService.login(email, password, addressIP);
            console.log("userData",userData);
            res.cookie(`refreshToken`, userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
            return res.json(userData);
        } catch (error) {
            next(error);
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await UserService.logout(refreshToken);
            res.clearCookie("refreshToken")
            return res.json(token)
        } catch (error) {
            next(error);
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const userData = await UserService.refresh(refreshToken);
            res.cookie(`refreshToken`, userData.refreshToken, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                httpOnly: true
            });
           return res.json(userData)
        } catch (error) {
            next(error);
        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(["HELLO"]);
        } catch (error) {
            next(error);
        }
    }
}

export default new UserController();