import RouterExp from "express";
import {authMiddleware} from "../middlewares/auth-middleware.js";
import ManagementController from "../controllers/management-controller.js";
import BookingController from "../controllers/booking-controller.js";
import UserYookingController from "../controllers/user-yooking-controller.js";
import UserExtranetController from "../controllers/user-extranet-controller.js";
import ObjectController from "../controllers/object-controller.js";
import CategoryController from "../controllers/category-controller.js";
import PhotosObjectController from "../controllers/photos-object-controller.js";
import NumberController from "../controllers/number-controller.js";
import PhotosNumberController from "../controllers/photos-number-controller.js";
import ContractController from "../controllers/contract-controller.js";
import SettingAccountController from "../controllers/setting-account-controller.js";
import ChatSupportController from "../controllers/chat-support-controller.js";
const Router = RouterExp.Router
const managementRoute = new Router()

//USERS YOOKING
managementRoute.get("/user/yooking", authMiddleware, UserYookingController.getAllUsersYooking)
managementRoute.put("/user/yooking/:userId", authMiddleware, UserYookingController.updateUserYooking)
managementRoute.delete("/user/yooking/:userId", authMiddleware, UserYookingController.deleteUserYooking)
//USERS EXTRANET
managementRoute.get("/user/extranet", authMiddleware, UserExtranetController.getAllUsersExtranet)
managementRoute.get("/user/extranet/:userId", authMiddleware, UserExtranetController.getUserExtranet)
managementRoute.put("/user/extranet/:userId", authMiddleware, UserExtranetController.updateUserExtranet)
managementRoute.delete("/user/extranet/:userId", authMiddleware, UserExtranetController.deleteUserExtranet)
//OBJECT
managementRoute.get("/objects", authMiddleware, ObjectController.getAllObject)
managementRoute.get("/object/:hotelId", authMiddleware, ObjectController.getObject)
managementRoute.put("/object/:hotelId", authMiddleware, ObjectController.updateObject)
managementRoute.delete("/object/:hotelId", authMiddleware, ObjectController.deleteObject)
//NUMBER
managementRoute.get('/numbers/:hotelId', authMiddleware, NumberController.getAllNumbers);
managementRoute.get('/number/:numberId', authMiddleware, NumberController.getNumberById);
managementRoute.post('/numbers', authMiddleware, NumberController.createNumber);
managementRoute.put('/numbers/:numberId', authMiddleware, NumberController.updateNumber);
managementRoute.post('/numbers/:numberId', authMiddleware, NumberController.deleteNumberById);
managementRoute.delete('/numbers/:id', authMiddleware, NumberController.deleteNumbersByLastCategory);
managementRoute.delete('/numbers/:categoryId', authMiddleware, NumberController.deleteAllNumbersByCategory);
managementRoute.delete('/numbers/:hotelId', authMiddleware, NumberController.deleteAllNumberByObject);
//BOOKING
managementRoute.get('/bookings', authMiddleware, BookingController.getAllBooking);
managementRoute.get('/booking/:id', authMiddleware, BookingController.getBooking);
managementRoute.put('/booking/:id', authMiddleware, BookingController.updateBooking);
managementRoute.delete('/booking/:id', authMiddleware, BookingController.deleteBooking);
//NUMBER PHOTOS
managementRoute.get('/numbers/photos/:categoryId', authMiddleware, PhotosNumberController.getAllPhotosCategoryNumber);
managementRoute.get('/number/photos/:numberId', authMiddleware, PhotosNumberController.getAllPhotosNumber);
managementRoute.post('/number/photos', authMiddleware, PhotosNumberController.createNumberPhotos);
managementRoute.delete('/number/photo/:idImg', authMiddleware, PhotosNumberController.deleteNumberPhoto);
managementRoute.delete('/number/photos/:numberId', authMiddleware, PhotosNumberController.deleteAllNumberPhotos);
managementRoute.delete('/number/photos/:categoryId', authMiddleware, PhotosNumberController.deleteAllCategoryNumberPhotos);
//OBJECT PHOTOS
managementRoute.get("/object/photos/:hotelId", authMiddleware, PhotosObjectController.getAllPhotosObject);
managementRoute.post('/object/photos', authMiddleware, PhotosObjectController.createPhotoObject);
managementRoute.delete('/object/photo/:idImg', authMiddleware, PhotosObjectController.deletePhotoObject);
managementRoute.delete('/object/photos/:hotelId', authMiddleware, PhotosObjectController.deleteAllPhotosObject);
//CATEGORY
managementRoute.get('/categories/:hotelId', authMiddleware, CategoryController.getAllCategoryNumber);
managementRoute.post('/category', authMiddleware, CategoryController.createCategoryNumber);
managementRoute.put('/category/:categoryId', authMiddleware, CategoryController.updateCategoryNumber);
managementRoute.put('/category/:categoryLimitId', authMiddleware, CategoryController.updateCategoryNumberLimit);
managementRoute.delete('/category/:categoryId', authMiddleware, CategoryController.deleteCategoryNumber);
managementRoute.delete('/categories/:hotelId', authMiddleware, CategoryController.deleteAllCategoryNumber);
//CHAT SUPPORT
managementRoute.get('/chat', authMiddleware,ChatSupportController.getAllUsers);
managementRoute.put('/chat/:userId', authMiddleware, ChatSupportController.saveMessage);
managementRoute.put('/chat/viewMsg/:userId', authMiddleware, ChatSupportController.viewMessage);
managementRoute.post('/chat/add', authMiddleware, ChatSupportController.newDialogue);
managementRoute.post('/chat/delete/:userId', authMiddleware, ChatSupportController.deleteDialogue);


export default managementRoute;
