import { Request, Response, NextFunction, RequestHandler } from 'express';
import { CustomError } from '../custom/ErrorHandler';
import { IQueryImage } from '../../../interfaces';
import { FileFactory } from '../../../utils/FilesFactory';
import { ImageDirType } from '../../../constants';

const isPositivInt = (size: number, dim: string): void => {
  if (Number.isNaN(size) || size < 1) {
    throw new CustomError(`${dim} must be positive integer`, 422);
  }
};

export const queryParamsValidation = (keys: string[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as IQueryImage;
      const width: number = parseInt(query.width as unknown as string);
      const height: number = parseInt(query.height as unknown as string);
      const fullImageExist = await FileFactory.doesFullImageExist(
        query.filename,
      );
      const getAllFullImageNames = await FileFactory.getImageNames(
        ImageDirType.FULL,
      );

      const invalidQueryParams: string[] = [];

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
          `Invalid request. Missing query parameters: ${[
            ...invalidQueryParams,
          ].join(', ')}`,
          422,
        );

      if (Object.keys(query).length > 0) {
        isPositivInt(width, 'width');
        isPositivInt(height, 'height');
      }

      if (!fullImageExist && query.filename !== undefined)
        throw new CustomError(
          `Filename "${
            query.filename
          }" doesn't exist. Please use one of these filenames: ${[
            ...getAllFullImageNames,
          ].join(', ')}.`,
          422,
        );

      next();
    } catch (err) {
      if (err instanceof CustomError) {
        next(err);
      }
    }
  };
};
