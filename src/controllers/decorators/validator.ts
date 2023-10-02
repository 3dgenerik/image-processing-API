import 'reflect-metadata'
import { AppFeatures } from '../../constants'


export const validator = (...keys: string[])=>{
    return (target: any, key: string, desc: PropertyDescriptor)=>{
        Reflect.defineMetadata(AppFeatures.VALIDATOR, [...keys], target, key)
    }
}