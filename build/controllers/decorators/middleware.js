"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const middleware = (middleware) => {
    return (target, key, desc) => {
        const middlewares = Reflect.getMetadata("middleware" /* AppFeatures.MIDDLEWARE */, target, key) || [];
        Reflect.defineMetadata("middleware" /* AppFeatures.MIDDLEWARE */, [...middlewares, middleware], target, key);
    };
};
exports.middleware = middleware;
