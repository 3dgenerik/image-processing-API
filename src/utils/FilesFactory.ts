import path from 'path'
import {promises as fs} from 'fs';
import { IQueryImage } from '../interfaces';
import { ImageDirType } from '../constants';

export class FileFactory{
    public static format: string = '.jpg'
    private static fullImagesDirPath = path.join(__dirname, '../../public/images/full')
    private static thumbImagesDirPath = path.join(__dirname, '../../public/images/thumb')

    //switch between FULL and THUMB dir paths
    public static getImageDirPath(type: ImageDirType):string{
        switch(type){
            case ImageDirType.FULL:
                return FileFactory.fullImagesDirPath;
            case ImageDirType.THUMB:
                return FileFactory.thumbImagesDirPath;
            default:
                throw new Error('Wrong dir type. Please use FULL or THUMB instead.')
        }
    }

    //get FULL or THUMB image names in folder
    public static async getImageNames(dirType: ImageDirType):Promise<string[]>{
        const fullDirPath = FileFactory.getImageDirPath(dirType)
        const allFiles = (await fs.readdir(fullDirPath)).map((imageName: string)=>imageName.split('.')[0])

        try{
            await fs.access(fullDirPath)
            return allFiles || []
        }catch{
            return []
        }
    }

    //does full image exist
    public static async doesFullImageExist(filename: string):Promise<boolean>{
        if(!filename){
            return false;
        }
        const fullImageNameArray = await FileFactory.getImageNames(ImageDirType.FULL)
        return fullImageNameArray.includes(filename);
    }


    //creeate thumbFullName
    public static thumbFileName(query: IQueryImage):string{
        return `${query.filename}_thumb_${query.width}x${query.height}`
    }

    //does thumb image exist
    public static async doesThumbImageExist(query: IQueryImage):Promise<boolean>{
        if(!query){
            return false;
        }

        const thumbImageName = FileFactory.thumbFileName(query)
        const thumbImageNameArray = await FileFactory.getImageNames(ImageDirType.THUMB)

        return thumbImageNameArray.includes(thumbImageName)
    }

    public static thumbImageMainPath(query: IQueryImage):string{
        const thumbFileName = FileFactory.thumbFileName(query)
        const thumbDirPath = FileFactory.getImageDirPath(ImageDirType.THUMB)

        return `${path.join(thumbDirPath, thumbFileName)}${FileFactory.format}`
    }

    public static fullImageMainPath(filename: string):string{
        const imageDirPath = FileFactory.getImageDirPath(ImageDirType.FULL)

        return `${path.join(imageDirPath, filename)}${FileFactory.format}`
    }


}