import SettingAccountService from "../service/setting-account-service.js";


class SettingAccountController {
    async getSettlement(req, res, next) {
        try {
            const dataSettlement = await SettingAccountService.getSettlement()
            res.json(dataSettlement);
        } catch (error) {
            next(error);
        }
    }
    async getSettingAccount(req, res, next) {
        try {
            const id = req.params.id;
            const data = await SettingAccountService.getSettingAccount(id);
             res.json(data);
        } catch (error) {
            next(error);
        }
    }
    async updateSettingAccount(req, res, next) {
        try {
            const id = req.params.id;
            const { dataSettingAccount} = req.body;
            const data = await SettingAccountService.updateSettingAccount(id, dataSettingAccount);
             res.json(data);
        } catch (error) {
            next(error);
        }
    }
    async updateAllCheckedSettlement(req, res, next) {
        try {
            const {dataUpdate} = req.body;
            console.log("dataUpdate",dataUpdate)
            const data = await SettingAccountService.updateAllCheckedSettlement(dataUpdate);
           return  res.json(data);
        } catch (error) {
            next(error);
        }
    }
    async updateCheckedSettlement(req, res, next) {
        try {
            const idObject = req.params.idObject;
            const {dataSettlement} = req.body;
            const data = await SettingAccountService.updateCheckedSettlement(idObject, dataSettlement);
            res.json(data);
        } catch (error) {
            next(error);
        }
    }
}

export default new SettingAccountController();