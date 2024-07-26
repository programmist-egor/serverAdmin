import ApiError from "../exceptions/api-error.js";
import CategoryNumbersExtranet from "../models/category-number-extranet-model.js";


class CategoryService {
    async getAllCategoryNumber(hotelId) {
        const result = await CategoryNumbersExtranet.findAll({where: {hotelId: hotelId}});
        return result

    }

    async createCategoryNumber(dataCategory) {
        try {
            return await CategoryNumbersExtranet.create(dataCategory)

        } catch (e) {
            throw new ApiError.BadRequest("Ошибка создании категории");
        }
    }

    async updateCategoryNumber(categoryId, categoryData, condition) {
        const category = await CategoryNumbersExtranet.findOne({where: {categoryId: categoryId}});
        if (category) {
            if (condition === "add") {
                category.countNumbers += categoryData
                return category.save();
            }
            if (condition === "del") {
                category.countNumbers -= categoryData
                return category.save();
            }
        } else {
            throw new ApiError.BadRequest("Ошибка обновления категории");
        }
    }

    async updateCategoryNumberLimit(categoryLimitId, dataCategory) {
        const category = await CategoryNumbersExtranet.findOne({where: {categoryId: categoryLimitId}});
        if (category) {
            category.countNumbers = dataCategory
            return category.save();
        } else {
            throw new ApiError.BadRequest("Ошибка обновления категории");
        }
    }

    async deleteCategoryNumber(categoryId) {
        const result = await CategoryNumbersExtranet.destroy({where: {categoryId: categoryId}});
        if (result === 1) {
            return true
        }
    }

    async deleteAllCategoryNumber(hotelId) {
        const result = await CategoryNumbersExtranet.destroy({where: {hotelId: hotelId}});
        if (result === 1) {
            return true
        }
    }

}

export default new CategoryService()