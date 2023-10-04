import { Request, Response, NextFunction, RequestHandler } from 'express';
import { CustomError } from '../custom/ErrorHandler';
import { IQueryImage } from '../../../interfaces';
import { FileFactory } from '../../../utils/FilesFactory';


export const imageExistsValidation = (num: number): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const query = req.query as unknown as IQueryImage;
    const fullImageExist = await FileFactory.doesFullImageExist(query.filename);
    const thumbImageExist = await FileFactory.doesThumbImageExist(query)

    if(true)
        throw new CustomError("Doesn't exist in full folder.", 422);


    next();
  };
};
