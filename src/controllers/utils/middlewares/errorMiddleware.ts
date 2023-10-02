import { NextFunction, Request, Response } from "express";
import { CustomError } from "../custom/ErrorHandler";

export const errorHandler = (err: CustomError, req: Request, res: Response, next: NextFunction) => {
  const error = err.formatError().error
  res.status(error.statusCode || 500).send(error.message);
};