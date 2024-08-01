import { Router } from "express";
import adminController from "../controllers/adminController";

const adminRouter = Router();

adminRouter.post('/login',adminController.adminLogin)
adminRouter.get('/getusers',adminController.getUsers)
adminRouter.get('/getimages/:userId',adminController.getImages)




export default adminRouter