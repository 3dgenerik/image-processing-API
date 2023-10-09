import { Request, Response, NextFunction, RequestHandler } from 'express';
import { CustomError } from '../custom/ErrorHandler';
import { IQueryImage } from '../../../interfaces';
import { FileFactory } from '../../../utils/FilesFactory';
import { ImageDirType } from '../../../constants';


const widthAndHeightParamValuesCheckArr = (keys: string[], query: IQueryImage): string[] => {
  const nonPositiveWidthAndHeight: {[key: string]: number | null} = {};
        
  for (const key of keys) {
    if(key !== 'filename'){
      const val: number = Number(query[key]);
      if(Number.isNaN(val) || val < 1){
        nonPositiveWidthAndHeight[key] = null
      } 
    }
  }

  return Object.keys(nonPositiveWidthAndHeight);
}

export const queryParamsValidation = (keys: string[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const query = req.query as unknown as IQueryImage;
      // const width: number = parseInt(query.width as unknown as string);
      // const height: number = parseInt(query.height as unknown as string);
      const fullImageExist = await FileFactory.doesFullImageExist(
        query.filename,
      );
      const getAllFullImageNames = await FileFactory.getImageNames(
        ImageDirType.FULL,
      );

      const emptyQueryParamsArr: string[] = [];
      // const nonPositiveWidthAndHeight: string[] = [];
      
      if (!query) {
        throw new CustomError('Invalid request', 422);
      }

      for (const key of keys) {
        if (!query[key]) {
          emptyQueryParamsArr.push(key);
        }
      }

      if (emptyQueryParamsArr.length > 0)
      throw new CustomError(
    `You need to provide missing query parameters: ${[
      ...emptyQueryParamsArr,
          ].join(', ')}`,
          422,
          );
          

      if(getAllFullImageNames){
        if (!fullImageExist && query.filename !== undefined)
          throw new CustomError(
            `Filename "${
              query.filename
            }" doesn't exist. Please use one of these filenames: ${[
              ...getAllFullImageNames,
            ].join(', ')}.`,
            422,
          );
      }else{
        throw new CustomError(`Wrong path dir type. Please use: ${ImageDirType.FULL} or ${ImageDirType.THUMB}`, 422)
      }

      const badWidthAndHeightParams = widthAndHeightParamValuesCheckArr(keys, query)        
      if(badWidthAndHeightParams.length > 0){
        throw new CustomError(`Invalid request: ${[...badWidthAndHeightParams].join(', ')} has invalid parameter value${badWidthAndHeightParams.length===1 ? '' : 's'}. Please use positive integer instead.`, 422)
      }

      next();
    } catch (err) {
      if (err instanceof CustomError) {
        next(err);
      }
    }
  };
};
