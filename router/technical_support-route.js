import UserController from "../controllers/user-controller.js";
import RouterExp from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
const Router = RouterExp.Router
const technicalSupportRoute = new Router()

technicalSupportRoute.post('/login', UserController.login);
technicalSupportRoute.post('/logout', UserController.logout);
technicalSupportRoute.get('/refresh', UserController.refresh);
technicalSupportRoute.get('/statistic', authMiddleware, UserController.getUsers);

export default technicalSupportRoute;


