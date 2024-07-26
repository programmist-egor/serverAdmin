import ApiError from "../exceptions/api-error.js";
import UsersExtranet from "../models/users-extranet-model.js";


class UserExtranetService {
    async getAllUsersExtranet() {
        return await UsersExtranet.findAll();

    }

    async getUserExtranet(userId) {
        const result = await UsersExtranet.findOne({where: {id: userId}});
        if (!result) {
            throw ApiError.BadRequest("Нет такого пользователя!");
        }
        return result
    }

    async updateUserExtranet(userId, dataUserExtranet) {
        const [updatedRows] = await UsersExtranet.update(dataUserExtranet, {where: {id: userId}});
        if (updatedRows === 0) {
            throw ApiError.BadRequest("Нет такого пользователя!");
        }
    }

    async deleteUserExtranet(userId) {
        await UsersExtranet.destroy({where: {id: userId}});
    }
}

export default new UserExtranetService();