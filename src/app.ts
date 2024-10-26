import morgan from "morgan";
import helmet from "helmet";
import appconfigs from "./configs";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";
import { Apierror } from "./utility/Responsehandler";
import { NextFunction } from "express";
import cookieParser from "cookie-parser";
import { passport } from "./libs/passportauth";

const app = express();
app.use(
  cors({
    origin: appconfigs.Nextapp,
    credentials: true,
  })
);
app.use(express.json());
app.use(helmet());
app.use(passport.initialize());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("common"));
app.use(cookieParser());

// Import Routes
import authRouter from "./routes/auth.routes";
import userRouter from "./routes/user.routes";
app.use("/api/v1/quokkax/auth", authRouter);
app.use("/api/v1/quokkax/user", userRouter);

// Global Error Handler
app.use((err: Apierror, _req: any, res: any, _next: NextFunction) => {
  if (err instanceof Apierror) {
    return res.json({
      message: err.message,
      statusCode: err.statusCode,
      status: "failed",
    });
  }
});
export default app;
