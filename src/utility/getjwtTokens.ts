import jwt from "jsonwebtoken";
import { IUsersPayload } from "../types";
import appconfigs from "../configs";

export const generateTokens = (
  registeredUser: IUsersPayload
): { accessToken: string; refreshToken: string } => {
  if (!appconfigs.AcesstokenKey || !appconfigs.RefreshtokenKey) {
    throw new Error("Token signing keys are not properly configured.");
  }

  const signToken = (key: string, expiresIn: string) =>
    jwt.sign({ _id: registeredUser._id, email: registeredUser.email }, key, {
      expiresIn,
    });

  return {
    accessToken: signToken(appconfigs.AcesstokenKey, "1d"),
    refreshToken: signToken(appconfigs.RefreshtokenKey, "24d"),
  };
};
