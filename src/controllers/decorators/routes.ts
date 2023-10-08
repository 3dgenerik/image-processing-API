import 'reflect-metadata';
import { AppFeatures, AppMethods } from '../../constants';

const methodWrapper = (method: AppMethods) => {
  return (path: string) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: any, key: string) => {
      Reflect.defineMetadata(AppFeatures.PATH, path, target, key);
      Reflect.defineMetadata(AppFeatures.METHOD, method, target, key);
    };
  };
};

export const get = methodWrapper(AppMethods.GET);
export const post = methodWrapper(AppMethods.POST);
