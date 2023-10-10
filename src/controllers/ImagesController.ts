import { NextFunction, Request, Response } from 'express';
import { controller, get, validator } from './decorators';
import { IProcessImage, IQueryImage } from '../interfaces';
import { FileFactory } from '../utils/FilesFactory';
import { ImageProcessFactory } from '../utils/ImageProcessFactory';
import { CustomError } from './utils/custom/ErrorHandler';

@controller('/api')
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class ImagesController {
  @get('/images')
  @validator('filename', 'width', 'height')
  async getImages(req: Request, res: Response, next: NextFunction) {
    try {
      let isImageProcess = true;
      const query = req.query as unknown as IQueryImage;
      const thumbImageExist = await FileFactory.doesThumbImageExist(query);

      const mainFullImagePath = FileFactory.fullImageMainPath(query.filename);
      const mainThumbImagePath = FileFactory.thumbImageMainPath(query);

      const processImageParameters: IProcessImage = {
        sourceFile: mainFullImagePath,
        targetFile: mainThumbImagePath,
        width: Number(query.width),
        height: Number(query.height),
      };

      if (!thumbImageExist) {
        console.log(
          `Image ${FileFactory.thumbFileName(query)}${
            FileFactory.format
          } not exists. Creating images...`,
        );
        isImageProcess = await ImageProcessFactory.processImage(
          processImageParameters,
        );
      } else {
        console.log(
          `Image ${FileFactory.thumbFileName(query)}${
            FileFactory.format
          } already exists.`,
        );
      }

      if (!isImageProcess)
        throw new CustomError(`Ooops, can't create image.`, 422);

      res.sendFile(mainThumbImagePath);
    } catch (err) {
      if (err instanceof CustomError) {
        next(err);
      }
    }
  }
}
