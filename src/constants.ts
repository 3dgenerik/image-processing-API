import path from 'path';

export const constants = {
  prefixPath: '/api',
  publicPath: path.join(__dirname, '../public/images'),
  apiImages: '/api/images',
};

export const enum AppMethods {
  GET = 'get',
  POST = 'post',
}

export const enum AppFeatures {
  PATH = 'path',
  METHOD = 'method',
  MIDDLEWARE = 'middleware',
  VALIDATOR = 'validator',
}

export interface ICustomError {
  error: {
    statusCode: number;
    message: string;
  };
}

export const enum ImageDirType {
  FULL = 'full',
  THUMB = 'thumb',
}
