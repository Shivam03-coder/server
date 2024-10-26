import { Router } from "express";
import { UserSignin, UserSignup } from "../controller/auth/auth";

const authRouter = Router();

authRouter.route("/signup").post(UserSignup);
authRouter.route("/signin").post(UserSignin);

export default authRouter;
