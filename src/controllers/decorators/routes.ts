import 'reflect-metadata'

const methodWrapper = (method: AppMethods)=>{
    return (path: string)=>{
        return (target: any, key: string, desc: PropertyDescriptor)=>{
            Reflect.defineMetadata(AppFeatures.PATH, path, target, key);
            Reflect.defineMetadata(AppFeatures.METHOD, method, target, key)
        }
    }
}

export const get = methodWrapper(AppMethods.GET)
export const post = methodWrapper(AppMethods.POST)
