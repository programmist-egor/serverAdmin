import ManagementService from "../service/management-service.js";


class ManagementController {
    async getBooking(req, res, next) {
        try {
            const data = await ManagementService.getBooking()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

    async getCategory(req, res, next) {
        try {
            const data = await ManagementService.getCategory()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

    async getContract(req, res, next) {
        try {

            const data = await ManagementService.getContract()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

    async getObject(req, res, next) {
        try {

            const data = await ManagementService.getObject()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

    async getNumbers(req, res, next) {
        try {

            const data = await ManagementService.getNumbers()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

    async getUserYooking(req, res, next) {
        try {
            const data = await ManagementService.getUserYooking()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

    async getUserExtranet(req, res, next) {
        try {
            const data = await ManagementService.getUserExtranet()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

    async getPhotoNumbers(req, res, next) {
        try {

            const data = await ManagementService.getPhotoNumbers()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }

    async getPhotoObject(req, res, next) {
        try {

            const data = await ManagementService.getPhotoObject()
            res.json(data)
        } catch (error) {
            next(error);
        }
    }
}

export default new ManagementController();