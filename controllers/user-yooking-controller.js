import UserYookingService from "../service/user-yooking-service.js";
import ApiError from "../exceptions/api-error.js";

class UserYookingController {
    async getAllUsersYooking(req, res, next) {
        try {
            const data = await UserYookingService.getAllUsersYooking()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async updateUserYooking(req, res, next) {
        try {
            const userId = req.params.userId
            const {dataUserYooking} = req.body
            if (!userId && !dataUserYooking) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            await UserYookingService.updateUserYooking(userId, dataUserYooking)

        } catch (error) {
            next(error);
        }
    }

    async deleteUserYooking(req, res, next) {
        try {
            const userId = req.params.userId
            if (!userId) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            await UserYookingService.deleteUserYooking(userId)

        } catch (error) {
            next(error);
        }
    }
}

export default new UserYookingController()