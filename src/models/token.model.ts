import mongoose, { Schema } from "mongoose";
import { Itoken } from "../types";
import appconfigs from "../configs";
import Jwt from "jsonwebtoken";

const TokenSchema: Schema<Itoken> = new Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  refreshToken: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: "10d",
  },
});

TokenSchema.methods.checkToken = function (oldrefreshtoken: string): boolean {
  try {
    Jwt.verify(oldrefreshtoken, appconfigs.RefreshtokenKey!);
    return true;
  } catch (err) {
    return false;
  }
};

export const Token = mongoose.model<Itoken>("Token", TokenSchema);
