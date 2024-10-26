import {
  Strategy as JwtStrategy,
  ExtractJwt,
  JwtFromRequestFunction,
} from "passport-jwt";
import passport from "passport";
import appconfigs from "../configs";
import { User } from "../models/user.model";

interface JwtPayload {
  _id: string;
}

const opts: { jwtFromRequest: JwtFromRequestFunction; secretOrKey: string } = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: appconfigs.AcesstokenKey!,
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload: JwtPayload, done) => {
    console.log("🚀 ~ newJwtStrategy ~ jwt_payload:", jwt_payload)
    try {
      const user = await User.findById(jwt_payload._id).select(
        "-password -createdAt -updatedAt -__v"
      );

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      console.error("Error in JWT strategy:", error);
      return done(error, false);
    }
  })
);

export { passport };
