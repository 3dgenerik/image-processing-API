import { FileFactory } from '../utils/FilesFactory';
import { ImageDirType } from '../constants';
import { IQueryImage } from '../interfaces';
import { ImageProcessFactory } from '../utils/ImageProcessFactory';
import { IProcessImage } from '../interfaces';
import { promises as fs } from 'fs';


describe('Test file factory: ', ()=>{
    const filename = 'santamonica';
    const query: IQueryImage = {
        filename,
        width: 200,
        height: 200
    }
    const fullImagePath = FileFactory.fullImageMainPath(filename) 
    const thumbImagePath = FileFactory.thumbImageMainPath(query)

    const isFileExists = async (filePath:string) => {
        try {
          await fs.access(filePath);
          return true;
        } catch{
          return false;
        }
      };

    
    beforeAll(async ()=>{

        const imageToCreate:IProcessImage = {
            sourceFile: fullImagePath,
            targetFile: thumbImagePath,
            width: 200,
            height: 200
        }

        const isThumbExist = await isFileExists(thumbImagePath)

        if(await isFileExists(fullImagePath)){
            if(!isThumbExist){
                console.log(`...creating ${FileFactory.thumbFileName(query)}${FileFactory.format} temp file`);
                await ImageProcessFactory.processImage(imageToCreate)
            }else{
                console.log(`Thumb ${FileFactory.thumbFileName(query)}${FileFactory.format} already exist. Skiping process image...`);
            }
        }else{
            console.log(`Full image ${filename} doesn't exist.`);
        }
    })


    it('Image full path should be string and not to be null', ()=>{
        const imagePath = FileFactory.getImageDirPath('full' as ImageDirType)
        expect(typeof imagePath).toBe('string')
        expect(imagePath).not.toBeNull()
    })

    it(`Image something-wrong path should reise error: 'Wrong dir type. Please use FULL or THUMB instead.'`, ()=>{
        expect(() => {
            FileFactory.getImageDirPath('something-wrong' as ImageDirType);
          }).toThrowError('Wrong dir type. Please use FULL or THUMB instead.');
    })

    it('Image names array length should return more then 0 images', async ()=>{
        const imagesArray = await FileFactory.getImageNames(ImageDirType.FULL) || []
        expect(imagesArray.length).toBeGreaterThan(0)
    })

    it('Image exist in FULL image folder', async()=>{
        const isExist = await FileFactory.doesFullImageExist(filename)
        expect(isExist).toBeTrue()
    })

    it('Image NOT exist in FULL image folder', async()=>{
        const isExist = await FileFactory.doesFullImageExist('some-image-name')
        expect(isExist).toBeFalse()
    })

    //file fjord_thumb_200x200.jpg should exist in THUMB folder for this test
    it('Image exist in THUMB image folder ', async()=>{

        const isExist = await FileFactory.doesThumbImageExist(query)
        expect(isExist).toBeTrue()
    })

    afterAll(async ()=>{

        const isThumbExist = await isFileExists(thumbImagePath)

        if(isThumbExist){
            console.log(`...deleting ${FileFactory.thumbFileName(query)}${FileFactory.format} temp file`);
            await fs.unlink(thumbImagePath)

        }else{
            console.log(`Thumb doesn't exist. Skiping deleting...`);
        }
    })

})