import express from "express";
import { loginController, logOffController, registerController } from "../controllers/auth.controller";
import { passportWrapper } from "../middlewares/passportWrapper.middleware";


const authRouter = express.Router();


authRouter.get("/logoff", logOffController);
authRouter.post("/register", passportWrapper, registerController);
authRouter.post("/login", loginController);

export default authRouter;
