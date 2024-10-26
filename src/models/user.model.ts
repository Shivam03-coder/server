import mongoose, { Schema } from "mongoose";
import { IUser, UserRoleType } from "../types";

const UserSchema: Schema<IUser> = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phonenumber: { type: String, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: Object.values(UserRoleType),
      default: UserRoleType.user,
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model<IUser>("User", UserSchema);
