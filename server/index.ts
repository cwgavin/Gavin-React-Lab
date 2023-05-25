import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

// a test route to make sure we can reach the backend
// this would normally go in a routes file
app.get("/test", (req: Request, res: Response) => {
  res.send({ message: "Express + TypeScript Server" });
});

app.listen(port);
console.log(`Server is running at http://localhost:${port}`);
