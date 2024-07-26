import RouterExp from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import StatisticController from "../controllers/statistic-controller.js";
const Router = RouterExp.Router
const statisticRouter = new Router()

//Statistic
statisticRouter.get('/', authMiddleware, StatisticController.getStatistic);
statisticRouter.get('/settlement', authMiddleware, StatisticController.getSettlement);
statisticRouter.get('/settlement/:uid', authMiddleware, StatisticController.getSettlementNumber);



export default statisticRouter;


