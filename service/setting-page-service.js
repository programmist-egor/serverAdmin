import SettingPageObject from "../models/setting-page-object-model.js";
import PhotoSettingPageExtranet from "../models/photo-setting-page-extranet-model.js";



class SettingPageService {
    async getSettingPage() {
        return await SettingPageObject.findAll()
    }
    async getPhotoSettingPage() {
        return await PhotoSettingPageExtranet.findAll()
    }
    async updatePhotoSettingPage(id, photoSettingPage) {
        return await PhotoSettingPageExtranet.update(photoSettingPage,{ where: { id: id } });
    }
    async updateSettingPage(id, dataSettingPage) {
        return await SettingPageObject.update(dataSettingPage,{ where: { id: id } });
    }
}

export default new SettingPageService()