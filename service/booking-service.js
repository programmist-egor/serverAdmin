import BookingExtranet from "../models/booking-extranet-model.js";
import ApiError from "../exceptions/api-error.js";


class BookingService {
    async getAllBooking() {
        const data = await BookingExtranet.findAll()
        if (!data) {
            throw new ApiError.BadRequest("Нет такой брони")
        }
        return data
    }
    async getBooking(id) {
        const data = await BookingExtranet.findOne({where: {id: id}})
        if (!data) {
            throw new ApiError.BadRequest("Нет такой брони")
        }
        return data
    }
    async updateBooking(id, data) {
        const [updatedRows] = await BookingExtranet.update(data, { where: { id: id } });
        if (updatedRows === 0) {
            throw new ApiError.BadRequest("Нет такой брони!");
        }
    }
    async deleteBooking(id) {
        await BookingExtranet.destroy( { where: { id: id } });
    }
}

export default new BookingService()