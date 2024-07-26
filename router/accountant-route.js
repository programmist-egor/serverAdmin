import RouterExp from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import SettingAccountController from "../controllers/setting-account-controller.js";
const Router = RouterExp.Router
const accountantRouter = new Router()

accountantRouter.get('/settlement', authMiddleware, SettingAccountController.getSettlement);
accountantRouter.get('/:id', authMiddleware, SettingAccountController.getSettingAccount);
accountantRouter.put('/:id', authMiddleware, SettingAccountController.updateSettingAccount);
accountantRouter.post('/checkedAll', authMiddleware, SettingAccountController.updateAllCheckedSettlement);
accountantRouter.put('/settlement/:idObject', authMiddleware, SettingAccountController.updateCheckedSettlement);

export default accountantRouter;


