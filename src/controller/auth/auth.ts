import { Request, Response } from "express";
import { AsyncHandler } from "../../utility/AsynchandlerFunction";
import {
  hashPassword,
  isEmailValid,
  isWeakpassword,
  options,
  verifyPassword,
} from "../../helper/sharedvariables";
import { Apierror, Apiresponse } from "../../utility/Responsehandler";
import { User } from "../../models/user.model";
import { IUser } from "../../types";
import { generateTokens } from "../../utility/getjwtTokens";
import { Token } from "../../models/token.model";

// SIGNUP

export const UserSignup = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const {
      firstname,
      lastname,
      email,
      phonenumber,
      password: plainPassword,
    } = req.body;

    // Validate required fields
    if (!firstname || !lastname || !email || !phonenumber || !plainPassword) {
      throw new Apierror(400, "Fields cannot be empty");
    }

    // Validate email format
    if (!isEmailValid(email)) {
      throw new Apierror(400, "Email is not valid");
    }

    // Validate password strength
    if (!isWeakpassword(plainPassword)) {
      throw new Apierror(400, "Password is weak");
    }

    // Check if email already exists
    const isEmailAlreadyExist = await User.findOne(
      { email },
      { projection: { _id: 1, email: 1 } }
    );

    if (isEmailAlreadyExist) {
      throw new Apierror(400, "Email already exists");
    }

    // Check if phone number already exists
    const isPhoneNumber = await User.findOne(
      { phonenumber },
      { projection: { _id: 1, email: 1 } }
    );

    if (isPhoneNumber) {
      throw new Apierror(400, "Phone number already exists");
    }

    // Hash the password
    const hashedPassword = await hashPassword(plainPassword);
    console.log("🚀 ~ hashedPassword:", hashedPassword);

    // Create new user in database
    const createdUser: IUser = await User.create({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      phonenumber,
    });

    // Exclude password from response
    const refinedUserCredentials = await User.findById(createdUser._id).select(
      "-password"
    );

    // Respond with success
    res.json(new Apiresponse(201, "Signup Successful", refinedUserCredentials));
  }
);

// SIGNIN

export const UserSignin = AsyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    const { email, password: plainPassword } = req.body;

    const registeredUser = await User.findOne(
      { email },
      { _id: 1, email: 1, password: 1 }
    );

    const refinedUser = await User.findOne({ email }).select(
      "-password -createdAt -updatedAt -__v"
    );

    if (!registeredUser) {
      throw new Apierror(400, "User donot exists");
    }

    // Verify Password

    if (!registeredUser?.password) {
      throw new Apierror(500, "Server Error");
    }

    const isPasswordCorrect = await verifyPassword(
      plainPassword,
      registeredUser.password
    );

    if (!isPasswordCorrect) {
      throw new Apierror(400, "Password is incorrect");
    }

    // generate accessToken and RefreshToken
    const { accessToken, refreshToken } = generateTokens(registeredUser);

    // Save in tokenModel

    await Token.create({
      userId: refinedUser?._id,
      refreshToken,
    });

    res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new Apiresponse(200, "Login succesfull", refinedUser));
  }
);

// Forgott Password
