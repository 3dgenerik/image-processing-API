import { NextFunction, Request, Response } from "express";
import { controller, get, post, middleware, validator } from "./decorators";

@controller('/')
class LoginTest{
    @get('images')
    @validator('mire', 'bore')
    test(req: Request, res: Response){
        res.send("JOX")
    }
}