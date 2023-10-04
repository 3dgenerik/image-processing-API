import 'reflect-metadata'
import { AppFeatures } from '../../constants'


export const validator = (num: number)=>{
    return (target: any, key: string, desc: PropertyDescriptor)=>{
        Reflect.defineMetadata(AppFeatures.VALIDATOR, num, target, key)
    }
}