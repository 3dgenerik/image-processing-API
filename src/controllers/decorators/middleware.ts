import { RequestHandler } from "express";

export const middleware = (middleware: RequestHandler)=>{
    return (target: any, key: string, desc: PropertyDescriptor) => {
        const middlewares = Reflect.getMetadata(AppFeatures.MIDDLEWARE, target, key) || []
        Reflect.defineMetadata(AppFeatures.MIDDLEWARE, [...middlewares, middleware], target, key)
    }
}