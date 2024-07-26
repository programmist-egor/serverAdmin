import ContractExtranet from "../models/contract-model.js";


class ContractService {
    async getDataContract() {
        const result = await ContractExtranet.findAll();
        if (result) {
            return result
        }
    }

    async updateContract(userId, contractData) {
        const result = await ContractExtranet.update(contractData, {where: {userId: userId}});
        return result
    }

    async deleteContract(userId) {
        const result = await ContractExtranet.destroy({where: {userId: userId}});
        return result
    }
}

export default new ContractService()