import RouterExp from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import SettingPageController from "../controllers/setting-page-controller.js";
import ObjectController from "../controllers/object-controller.js";


const Router = RouterExp.Router
const settingPageRouter = new Router()

//OBJECT
settingPageRouter.get("/objects", authMiddleware, ObjectController.getAllObject)
settingPageRouter.get('/object', authMiddleware, SettingPageController.getSettingPage);
settingPageRouter.put('/object/:id', authMiddleware, SettingPageController.updateSettingPage);
//PHOTOS
settingPageRouter.get('/photos', authMiddleware, SettingPageController.getPhotoSettingPage);
settingPageRouter.put('/photos/:id', authMiddleware, SettingPageController.updatePhotoSettingPage);



export default settingPageRouter;


