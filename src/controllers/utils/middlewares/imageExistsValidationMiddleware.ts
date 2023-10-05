import { Request, Response, NextFunction, RequestHandler } from 'express';
import { CustomError } from '../custom/ErrorHandler';
import { IQueryImage } from '../../../interfaces';
import { FileFactory } from '../../../utils/FilesFactory';


export const imageExistsValidation = (): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try{
        const query = req.query as unknown as IQueryImage;
        const fullImageExist = await FileFactory.doesFullImageExist(query.filename);
        const thumbImageExist = await FileFactory.doesThumbImageExist(query)
        // if(true)
        //     throw new CustomError('OVO RADIIIII', 422);
    
        next();
    }catch(err){
        if(err instanceof CustomError){
            next(err);
        }
    }
  };
};
