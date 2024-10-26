import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  _id: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  phonenumber?: string;
  email: string;
  password: string;
  role?: UserRoleType;
}

export enum UserRoleType {
  admin = "Admin",
  user = "User",
}

export interface IUsersPayload extends Document {
  _id: mongoose.Types.ObjectId;
  email: string;
}

export interface Itoken extends Document {
  userId: mongoose.Types.ObjectId;
  refreshToken: string;
  createdAt: Date;
  checkToken(oldrefreshtoken: string): boolean;
}

export type TokenType = {
  newaccessToken: string | undefined;
  newrefreshToken: string | undefined;
};
