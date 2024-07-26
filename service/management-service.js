import ApiError from "../exceptions/api-error.js";
import UsersYooking from "../models/users-yooking-model.js";
import UsersExtranet from "../models/users-extranet-model.js";
import BookingExtranet from "../models/booking-extranet-model.js";
import CategoryNumbersExtranet from "../models/category-number-extranet-model.js";
import ContractModel from "../models/contract-model.js";
import InvoiceExtranet from "../models/invoice-model.js";
import NumberExtranet from "../models/numbers-model.js";
import ObjectsExtranet from "../models/objects-extranet-model.js";
import PhotoObjectExtranet from "../models/photo-object-extranet-model.js";
import PhotoNumberObjectExtranet from "../models/photo-number-object-model.js";


class ManagementService {
    async getBooking() {
        const data = await BookingExtranet.findAll()
        if (!data) {
            throw new ApiError.BadRequest("Список бронирования пуст!")
        }
        return data
    }
    async getCategory() {
        const data = await CategoryNumbersExtranet.findAll()
        if (!data) {
            throw new ApiError.BadRequest("Список категорий пуст!")
        }
        return data
    }
    async getContract() {
        const data = await ContractModel.findAll()
        if (!data) {
            throw new ApiError.BadRequest("Список контрактов пуст!")
        }
        return data
    }
    async getObject() {
        const data = await ObjectsExtranet.findAll()
        if (!data) {
            throw new ApiError.BadRequest("Список объектов пуст!")
        }
        return data
    }
    async getNumbers() {
        const data = await NumberExtranet.findAll()
        if (!data) {
            throw new ApiError.BadRequest("Список номеров пуст!")
        }
        return data
    }
    async getUserYooking() {
        const data = await UsersYooking.findAll()
        if (!data) {
            throw new ApiError.BadRequest("Список пользователей Yooking пуст!")
        }
        return data

    }
    async getUserExtranet() {
        const data = await UsersExtranet.findAll()
        if (!data) {
            throw new ApiError.BadRequest("Список пользователей Extranet пуст!")
        }
        return data
    }
    async getPhotoNumbers() {
        const data = await PhotoNumberObjectExtranet.findAll()
        if (!data) {
            throw new ApiError.BadRequest("Список фотографий номеров пуст!")
        }
        return data
    }
    async getPhotoObject() {
        const data = await PhotoObjectExtranet.findAll()
        if (!data) {
            throw new ApiError.BadRequest("Список фотографий объектов пуст!")
        }
        return data
    }

}

export default new ManagementService()