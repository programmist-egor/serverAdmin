import ApiError from "../exceptions/api-error.js";
import SettingAccount from "../models/setting-account-model.js";
import Settlement from "../models/settlement-model.js";


class SettingAccountService {
    async getSettlement() {
        return await Settlement.findAll()
    }

    async getSettingAccount(id) {
        const result = await SettingAccount.findOne({where: {idTable: id}});
        if (!result) {
            throw new ApiError.BadRequest("Нет таких настроек!");
        }
        return result
    }

    async updateSettingAccount(id, dataSettingAccount) {
        const [updatedRows] = await SettingAccount.update(dataSettingAccount, {where: {idTable: id}});
        if (updatedRows === 0) {
            throw new ApiError.BadRequest("Нет таких настроек!");
        }
    }

    async updateAllCheckedSettlement(dataUpdate) {
        const result = await Settlement.findAll();
        console.log("RESULT", result);
        if (!result.length) {
            throw new Error("Данные не корректны");
        }
        const updatedResult = result.map(item => {
            return {
                ...item.dataValues,
                checked: dataUpdate
            };
        });
        let updatedCount = 0;
        const hasCheckedTrue = result.some(item => item.checked);
        if (hasCheckedTrue) {
            const updatedResultFalse = updatedResult.map(item => {
                return {
                    ...item,
                    checked: false
                };
            });
            for (const item of updatedResultFalse) {
                await Settlement.update({ checked: item.checked }, { where: { idObject: item.idObject } });
                updatedCount++;
            }
        } else {
            for (const item of updatedResult) {
                await Settlement.update({ checked: item.checked }, { where: { idObject: item.idObject } });
                updatedCount++;
            }
        }
        return updatedCount;
    }

    async updateCheckedSettlement(idObject, dataSettlement) {
        if (!idObject && !dataSettlement) {
            throw new ApiError.BadRequest("Данные не корректны")
        }
        const result = await Settlement.findOne({where: {idObject: idObject}})
        if (!result) {
            throw new ApiError.BadRequest("Данные не корректны")
        }
        if (result) {
            result.checked = dataSettlement
            return result.save()
        }
    }
}

export default new SettingAccountService();