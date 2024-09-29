
import ApiError from "../exceptions/api-error.js";
import ObjectsExtranet from "../models/objects-extranet-model.js";
import ContractExtranet from "../models/contract-model.js";


class ObjectService {
    async getAllObject() {
        const result = await ObjectsExtranet.findAll();
        if(result) {
            return result
        }
    }
    async getObject(hotelId) {
        const result = await ObjectsExtranet.findOne( { where: { hotelId: hotelId } });
        if(result) {
            return result
        }
    }

    async getDataUserObject(hotelId) {
        const result = await ObjectsExtranet.findOne( { where: { hotelId: +hotelId } });
        const userId = result.dataValues.userId
        const requisites = await ContractExtranet.findOne({where:{userId:  userId}})
        console.log("requisites",requisites);

        if(requisites) {
            return requisites
        }
    }
    async getObjectByUserId(userId) {
        const result = await ObjectsExtranet.findAll({where: {userId: userId}});
        if (result) {
            return result
        }
    }
    async updateObject(hotelId, dataObjectSetting) {
        const [updatedRows] = await ObjectsExtranet.update(dataObjectSetting, { where: { hotelId: hotelId } });
        if (updatedRows === 0) {
            throw new ApiError.BadRequest("Нет такого пользователя!");
        }
    }
    async deleteObject(hotelId) {
        await ObjectsExtranet.destroy( { where: { hotelId: hotelId } });
    }

}
export default new ObjectService();