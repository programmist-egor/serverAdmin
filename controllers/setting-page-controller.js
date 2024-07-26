import SettingPageService from "../service/setting-page-service.js";


class SettingPageController {
    async getSettingPage(req, res, next) {
        try {
            const data = await SettingPageService.getSettingPage()
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
    async getPhotoSettingPage(req, res, next) {
        try {
            const data = await SettingPageService.getPhotoSettingPage()
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
    async updatePhotoSettingPage(req, res, next) {
        try {
            const id = req.params.id;
            const {photoSettingPage} = req.body
            const result = await SettingPageService.updatePhotoSettingPage(id, photoSettingPage)
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
    async updateSettingPage(req, res, next) {
        try {
            const id = req.params.id;
            const {dataSettingPage} = req.body
            const result = await SettingPageService.updateSettingPage(id, dataSettingPage)
            res.json(result);
        } catch (error) {
            next(error);
        }
    }
}

export default new SettingPageController();