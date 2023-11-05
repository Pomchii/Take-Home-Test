import { NextFunction, Request, Response } from "express";

export function errorHandler(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction
) {
  console.log(error);
  let errorMessage = "An unkown error ocurred.";
  let statusCode = 500;
  if (error) {
    errorMessage = error.message;
    statusCode = error.status;
  }
  response.status(statusCode).json({ error: { message: errorMessage } });
}
