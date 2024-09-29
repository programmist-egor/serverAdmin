import RouterExp from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import SettingAccountController from "../controllers/setting-account-controller.js";
const Router = RouterExp.Router
const accountantRouter = new Router()

accountantRouter.get('/settlement', authMiddleware, SettingAccountController.getSettlement);
accountantRouter.get('/', authMiddleware, SettingAccountController.getSettingAccount);
accountantRouter.put('/update/:id', authMiddleware, SettingAccountController.updateSettingAccount);
accountantRouter.put('/update/choose/:id', authMiddleware, SettingAccountController.updateChooseAccount);
accountantRouter.post('/create', authMiddleware, SettingAccountController.creatSettingAccount);
accountantRouter.delete('/delete/:id', authMiddleware, SettingAccountController.deleteSettingAccount);
accountantRouter.post('/checkedAll', authMiddleware, SettingAccountController.updateAllCheckedSettlement);
accountantRouter.put('/settlement/:idObject', authMiddleware, SettingAccountController.updateCheckedSettlement);

export default accountantRouter;


