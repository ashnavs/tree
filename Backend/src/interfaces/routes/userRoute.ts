import { Router } from "express";
import userController from "../controllers/userController";
import multer from 'multer';

const userRouter = Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadFields = [
  { name: 'fileField0', maxCount: 4 },
  { name: 'fileField1', maxCount: 4 },
  { name: 'fileField2', maxCount: 4 },
  { name: 'fileField3', maxCount: 4 },
  { name: 'fileField4', maxCount: 4 },
  { name: 'fileField5', maxCount: 4 },
];

userRouter.post('/signup', userController.userSignup);
userRouter.post('/login', userController.userLogin);
userRouter.post('/imageupload', upload.fields(uploadFields), (req, res) => userController.imageUpload(req as any, res));

export default userRouter;
