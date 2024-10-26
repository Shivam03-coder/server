import { Token } from "../models/token.model";
import { Apierror } from "./Responsehandler";
import { generateTokens } from "./getjwtTokens";
import { User } from "../models/user.model";
import { TokenType } from "../types";

const RenewjwtTokens = async (oldRefreshtoken: string): Promise<TokenType> => {
  try {
    //! Find the token associated with the provided old refresh token
    const authenticatedUser = await Token.findOne({
      refreshToken: oldRefreshtoken, // Query the database for a matching refresh token
    });

    //! Check if no authenticated user is found; if so, throw an error
    if (!authenticatedUser) {
      throw new Apierror(409, "Please login again"); // Throw a conflict error indicating the user needs to log in again
    }

    //! Verify if the old refresh token is valid
    if (!authenticatedUser.checkToken(oldRefreshtoken)) {
      throw new Apierror(409, "Please login again"); // Throw a conflict error if the token check fails
    }

    //TODO Generate new JWT tokens using the authenticated user's information
    //? Generate new access and refresh tokens using the registered user's data

    const registerdUser = await User.findById(authenticatedUser.userId);
    const { accessToken: newaccessToken, refreshToken: newrefreshToken } =
      generateTokens(registerdUser!);

    //! Return the new access and refresh tokens as an object
    return {
      newaccessToken,
      newrefreshToken,
    };
  } catch {
    //! Handle any errors that occur during the token renewal process
    throw new Apierror(500, "Unable to renew Tokens");
  }
};

export default RenewjwtTokens;
