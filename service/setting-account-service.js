import ApiError from "../exceptions/api-error.js";
import SettingAccount from "../models/setting-account-model.js";
import Settlement from "../models/settlement-model.js";
import {scheduleMail} from "../index.js";


class SettingAccountService {
    async getSettlement() {
        return await Settlement.findAll()
    }

    async getSettingAccount() {
        const result = await SettingAccount.findAll();
        if (!result) {
            throw new ApiError.BadRequest("Нет таких настроек!");
        }
        return result
    }

    async creatSettingAccount(dataSettingAccount) {
        const result = await SettingAccount.create(dataSettingAccount);
        if(result) {
            return {success: true, message: "Бухгалтер успешно добавлен!"}
        } else {
            return {success: false, message: "Бухгалтер не добавлен!"}
        }
    }

    async deleteSettingAccount(id) {
        const result = await SettingAccount.destroy({where:{id: id}});

        if(result) {
            return {success: true, message: "Бухгалтер успешно удален!"}
        } else {
            return {success: false, message: "Бухгалтер не удален!"}
        }
    }


    async updateSettingAccount(id, dataSettingAccount) {
        // Обновляем запись с заданным id
        const updatedAccount = await SettingAccount.update(dataSettingAccount, {
            where: { id: id },
        });

        await scheduleMail(dataSettingAccount)
        return updatedAccount;
    }

    async updateChooseAccount(id) {
        const result = await SettingAccount.findAll();

        const updateData = result.map(item => {
            if(item.id !== id) {
                item.chooseAccount = false
            }
            return item
        })

        updateData.map( item =>  {
            SettingAccount.update({chooseAccount: item.chooseAccount}, {where: {id: item.id}})
        })

        return result;
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