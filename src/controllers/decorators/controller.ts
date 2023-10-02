import 'reflect-metadata'
import { RouterSingleton } from '../../RouterSingleton'
import { AppFeatures, AppMethods } from '../../constants'
import { queryParamsValidation } from '../utils/middlewares/queryValidationMiddleware'

export const controller = (routePrefix: string)=>{
    return (target: Function)=>{
        const router = RouterSingleton.getInstance()
        const targetPrototypeNames = Object.getOwnPropertyNames(target.prototype)
        for (const key of targetPrototypeNames) {
            const path = Reflect.getMetadata(AppFeatures.PATH, target.prototype, key)
            const method = Reflect.getMetadata(AppFeatures.METHOD, target.prototype, key) as AppMethods;
            const middleware = Reflect.getMetadata(AppFeatures.MIDDLEWARE, target.prototype, key) || [];
            const validation = Reflect.getMetadata(AppFeatures.VALIDATOR, target.prototype, key) || [];
            if(path && method){
                router[method](`${routePrefix}${path}`, [...middleware], queryParamsValidation(validation), target.prototype[key])
            }
        }
    }
}