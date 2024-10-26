import { Request, Response, NextFunction } from "express";

const AsyncHandler =
  (
    asyncFunction: (
      req: Request,
      res: Response,
      next: NextFunction
    ) => Promise<void>
  ) =>
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(asyncFunction(req, res, next)).catch((err) => next(err));
  };

export { AsyncHandler };
