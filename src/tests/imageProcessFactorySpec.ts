import { ImageProcessFactory } from "../utils/ImageProcessFactory";
import { IProcessImage, IQueryImage } from "../interfaces";
import { FileFactory } from "../utils/FilesFactory";
import {promises as fs} from 'fs'

const validName = 'fjord'
const invalidName = 'fjord12345'

const query: IQueryImage={
    filename:'',
    width:777,
    height:777
}

const thumbPath = (query: IQueryImage): string=>{
    return FileFactory.thumbImageMainPath(query) 
}

const image = (filename: string):IProcessImage => {
    const validQuery: IQueryImage=query;
    validQuery.filename = filename;

    const fullImagePath = FileFactory.fullImageMainPath(validQuery.filename) 
    const thumbImagePath = thumbPath(validQuery)

    const imageForProcessing:IProcessImage = {
        sourceFile: fullImagePath,
        targetFile: thumbImagePath,
        width: validQuery.width,
        height: validQuery.height
    }

    return imageForProcessing
}


describe('Test image process: ', ()=>{
    beforeAll(async ()=>{
        const fullThumbPath = thumbPath({...query, filename: validName})
        try{
            await fs.access(fullThumbPath)
            await fs.unlink(fullThumbPath)
        }catch{
            console.log('Nothing to delete.');
        }
    })

    it('Test image process with valid query: should be true', async ()=>{
        const imageForProcessing  = image(validName)
        const processedImage = await ImageProcessFactory.processImage(imageForProcessing)
        expect(processedImage).toBeTrue()
    })

    it('Test image process with invalid query: should be false', async ()=>{
        const imageForProcessing  = image(invalidName)
        const processedImage = await ImageProcessFactory.processImage(imageForProcessing)
        expect(processedImage).toBeFalse()
    })
})