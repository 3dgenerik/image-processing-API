import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../custom/ErrorHandler';

export const errorHandlerMiddleware = (
  err: CustomError,
  req: Request,
  res: Response,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  const error = err.formatError().error;
  res.status(error.statusCode || 500).send(error.message);
};
