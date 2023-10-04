import { NextFunction, Request, Response } from "express";
import { controller, get, validator, middleware } from "./decorators";
import { ImageDirType, constants } from "../constants";
import { IQueryImage } from "../interfaces";
import { FileFactory } from "../utils/FilesFactory";
import { CustomError } from "./utils/custom/ErrorHandler";



@controller('/api')
class ImagesController{
    @get('/images')
    @validator('filename', 'width', 'height') 
    async getImages(req: Request, res: Response){
        const query = req.query as unknown as IQueryImage;
        const fullImageExist = await FileFactory.doesFullImageExist(query.filename);
        const thumbImageExist = await FileFactory.doesThumbImageExist(query)

        // if(!fullImageExist)
        // throw new CustomError(`Image ${query.filename}${FileFactory.format} doesn't exists.`, 422)

        res.sendFile(`${FileFactory.getImageDirPath(ImageDirType.FULL)}/${query.filename}.jpg`)
    }
}