import StatisticService from "../service/statistic-service.js";


class StatisticController {
    async getStatistic(req, res, next) {
        try {
            const data = await StatisticService.getStatistic()
            res.json(data);
        } catch (error) {
            next(error);
        }
    }

    async getSettlement(req, res, next) {
        try {
            const dataSettlement = await StatisticService.getSettlement()
            res.json(dataSettlement);
        } catch (error) {
            next(error);
        }
    }

    async getSettlementNumber(req, res, next) {
        try {
            const uid = req.params.uid;
            const dataNumbers = await StatisticService.getSettlementNumber(uid)
            res.json(dataNumbers);
        } catch (error) {
            next(error);
        }
    }
}

export default new StatisticController();