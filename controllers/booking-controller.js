import BookingService from "../service/booking-service.js";
import ApiError from "../exceptions/api-error.js";


class BookingController {
    async getAllBooking(req, res, next) {
        try {
            const data = await BookingService.getAllBooking()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async getBooking(req, res, next) {
        try {
            const id = req.params.id
            const data = await BookingService.getBooking(id)
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
    async updateBooking(req, res, next) {
        try {
            const id = req.params.id
            const {data} = req.body;
            if (!id && !data) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            await BookingService.updateBooking(id, data)
        } catch (error) {
            next(error);
        }
    }

    async deleteBooking(req, res, next) {
        try {
            const id = req.params.id
            if (!id) {
                return new ApiError.BadRequest("Некорректные данные")
            }
            await BookingService.deleteBooking(id)
        } catch (error) {
            next(error);
        }
    }

}

export default new BookingController()