import { Router } from "express";
import { loginController, registerController } from "../controllers/userController";
const userRouter = Router();

userRouter.post('/login' , loginController);

userRouter.post('/signup' , registerController);


export default userRouter;