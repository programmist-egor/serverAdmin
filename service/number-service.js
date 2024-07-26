import ApiError from "../exceptions/api-error.js";
import NumberExtranet from "../models/numbers-model.js";
import CategoryNumbersExtranet from "../models/category-number-extranet-model.js";


class NumberService {
    async getAllNumbers(hotelId) {
        const result = await NumberExtranet.findAll({where: {hotelId: hotelId}});
        if (result) {
            return result
        }
    }

    async getNumberById(numberId) {
        return await NumberExtranet.findOne({where: {id: numberId}});
    }

    async createNumber(dataNumber) {
        try {
            return await NumberExtranet.create(dataNumber)
        } catch (e) {
            throw new ApiError.BadRequest("Ошибка создании категории");
        }
    }

    async updateNumber(numberId, dataNumber) {
        const [updatedRows] = await NumberExtranet.update(dataNumber, {where: {id: numberId}});
        if (updatedRows === 0) {
            throw new ApiError.BadRequest("Нет такой категории!");
        }
    }

    async deleteNumberById(numberId, categoryId) {
        const category = await CategoryNumbersExtranet.findOne({where: {categoryId: categoryId}});
        await NumberExtranet.destroy({where: {id: numberId}});

        console.log("category",category);
        if (category) {
            category.countNumbers -= 1
            return category.save();
        } else {
            throw new ApiError.BadRequest("Ошибка обновления категории");
        }
    }

    async deleteNumbersByLastCategory(id) {
        const category = await NumberExtranet.findAll({where: {categoryId: id}});
        if (category && category.length > 0) {
            const lastObject = category[category.length - 1];
            return await NumberExtranet.destroy({where: {id: lastObject.id}});
        }
    }

    async deleteAllNumbersByCategory(categoryId) {
        const result = await NumberExtranet.destroy({where: {categoryId: categoryId}});
        if (result === 1) {
            return true
        }
    }

    async deleteAllNumberByObject(hotelId) {
        const result = await NumberExtranet.destroy({where: {hotelId: hotelId}});
        if (result === 1) {
            return true
        }
    }

}

export default new NumberService()