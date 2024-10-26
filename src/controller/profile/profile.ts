import { Request, Response } from "express";

export const Userprofile = async (req: Request, res: Response) => {
  console.log(req);
  res.send({ user: req.user });
};
