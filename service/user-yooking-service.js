import ApiError from "../exceptions/api-error.js";
import UsersYooking from "../models/users-yooking-model.js";
import UsersCorp from "../models/users-corp-model.js";


class UserYookingService {
    async getAllUsersYooking() {
       return await UsersYooking.findAll();
    }
    async getUserYooking(userId) {
        return await UsersYooking.findOne({ where: { id: userId } });
    }
    async getUserIdYookingCorp(userId) {
        return await UsersCorp.findOne({ where: { id: userId } });
    }
    async updateUserYooking(userId, dataUserYooking) {
        const updatedRows = await UsersYooking.update(dataUserYooking, { where: { id: userId } });
        if (updatedRows !== 0) {
            throw new ApiError.BadRequest("Нет такого пользователя!");
        } else {

        }
    }
    async deleteUserYooking(userId) {
        await UsersYooking.destroy( { where: { id: userId } });
    }
}
export default new UserYookingService();