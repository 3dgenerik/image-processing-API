import { Request, Response } from "express";
import { controller, get, validator } from "./decorators";
import { constants } from "../constants";

@controller('/api')
class ImagesController{
    @get('/images')
    @validator('filename', 'width', 'height')
    getImages(req: Request, res: Response){
        // res.send('images')
        res.sendFile(`${constants.publicPath}/full/fjord.jpg`)
    }
}