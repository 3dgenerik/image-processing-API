import 'reflect-metadata'
import { AppFeatures } from '../../constants'


export const queryValidator = ()=>{
    return (target: any, key: string, desc: PropertyDescriptor)=>{
        Reflect.defineMetadata(AppFeatures.VALIDATOR, '', target, key)
    }
}