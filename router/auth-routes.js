import UserController from "../controllers/user-controller.js";
import RouterExp from "express";
const Router = RouterExp.Router
const router = new Router()

router.post('/api/login', UserController.login);
router.post('/api/logout', UserController.logout);
router.get('/api/refresh', UserController.refresh);

export default router;


