import { NextFunction, Request, Response } from "express";
import { AsyncHandler } from "../utility/AsynchandlerFunction";
import { Apierror } from "../utility/Responsehandler";
import { isTokenExpired, options } from "../helper/sharedvariables";
import RenewjwtTokens from "../utility/renewjwtTokens";

export const RenewToken = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken } = req.cookies;

    if (!accessToken || !refreshToken) {
      throw new Apierror(401, "Unauthorized");
    }

    if (accessToken && !isTokenExpired(accessToken)) {
      req.headers["authorization"] = `Bearer ${accessToken}`;
    }

    if (!accessToken || isTokenExpired(accessToken)) {
      if (!refreshToken) {
        throw new Apierror(401, "Please login again");
      }

      const { newaccessToken, newrefreshToken } = await RenewjwtTokens(
        refreshToken
      );

      req.headers["authorization"] = `Bearer ${newaccessToken}`;

      res
        .cookie("accessToken", newaccessToken, options)
        .cookie("refreshToken", newrefreshToken, options);
    }
    next();
  }
);
