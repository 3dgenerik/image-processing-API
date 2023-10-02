import { Request, Response, NextFunction, RequestHandler } from 'express';
import { CustomError } from '../custom/ErrorHandler';
import { IQueryImage } from '../../../interfaces';

const isPositivInt = (size: number, dim: string): void=>{
  if (Number.isNaN(size) || size < 1) {
    throw new CustomError(`${dim} must be positive integer`, 422);
  } 
}

export const queryParamsValidation = (keys: string[]): RequestHandler => {
  return (req: Request, res: Response, next: NextFunction) => {
    const query = req.query as unknown as IQueryImage;
    const width: number = parseInt(query.width as unknown as string);
    const height: number = parseInt(query.height as unknown as string);

    let invalidQueryParams: string[] = [];

    if (!query) {
      throw new CustomError('Invalid request', 422);
    }
    for (const key of keys) {
      if (!query[key]) {
        invalidQueryParams.push(key);
      }
    }

    if (invalidQueryParams.length > 0)
      throw new CustomError(
        `Invalid request. Missing query parameters: ${[...invalidQueryParams].join(', ')}`,
        422,
      );
      
    isPositivInt(width, "width");
    isPositivInt(height, "height");

    next();
  };
};
