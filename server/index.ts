import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import logger from "morgan";
import cookieParser from "cookie-parser";
import createError from "http-errors";
import path from "path";

import indexRouter from "./routes/index";
import testRouter from "./routes/test";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/favicon.ico", (req: Request, res: Response) => res.status(204));

app.use("/", indexRouter);
app.use("/test", testRouter);

// catch 404 and forward to error handler
app.use(function (req: Request, res: Response, next: NextFunction) {
  next(createError(404));
});

// error handler
app.use(function (err: any, req: Request, res: Response, next: NextFunction) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.listen(port);
console.log(`Server is running at http://localhost:${port}`);
