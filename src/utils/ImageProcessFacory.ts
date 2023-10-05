import sharp from 'sharp'
import { FileFactory } from './FilesFactory'
import { CustomError } from '../controllers/utils/custom/ErrorHandler'
import { IProcessImage } from '../interfaces'



export class ImageProcessFactory{
    public static async processImage(sharpParameters: IProcessImage):Promise<boolean>{
        try{
            await sharp(sharpParameters.sourceFile)
                .resize(sharpParameters.width, sharpParameters.height)
                .toFile(sharpParameters.targetFile)
            return true;
        }catch{
            return false;
        }
    }
}