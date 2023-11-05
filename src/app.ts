import express, { Response, Request, NextFunction } from "express";
import { router } from "./routes";
import "dotenv";
import { errorHandler } from "./middleware/errorHandler/errorHandler";

export const app = express();

app.use(express.json());
app.use(router);
app.use(errorHandler);
