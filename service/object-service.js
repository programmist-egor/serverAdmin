
import ApiError from "../exceptions/api-error.js";
import ObjectsExtranet from "../models/objects-extranet-model.js";


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