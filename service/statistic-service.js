import ApiError from "../exceptions/api-error.js";
import Statistic from "../models/statistic-model.js";
import Settlement from "../models/settlement-model.js";
import StatisticNumbers from "../models/statistic-numbers-model.js";


class StatisticService {
    async getStatistic() {
        return await Statistic.findOne({where: {statsId: 1}})
    }

    async getSettlement() {
        return await Settlement.findAll()
    }

    async getSettlementNumber(uid) {
        const numbers = await StatisticNumbers.findAll({ where: { uid: uid } });
        if (!numbers || numbers.length === 0) {
            throw new ApiError.BadRequest("Нет таких номеров")
        }
        return numbers;
    }

}

export default new StatisticService()