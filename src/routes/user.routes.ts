import passport from "passport";
import { Router } from "express";
import { RenewToken } from "../middlewares/setnewTokens.middleware";
import { Userprofile } from "../controller/profile/profile";

const userRouter = Router();

userRouter
  .route("/profile")
  .get(
    RenewToken,
    passport.authenticate("jwt", { session: false }),
    Userprofile
  );

export default userRouter;
