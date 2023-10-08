"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = exports.get = void 0;
require("reflect-metadata");
const methodWrapper = (method) => {
    return (path) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (target, key) => {
            Reflect.defineMetadata("path" /* AppFeatures.PATH */, path, target, key);
            Reflect.defineMetadata("method" /* AppFeatures.METHOD */, method, target, key);
        };
    };
};
exports.get = methodWrapper("get" /* AppMethods.GET */);
exports.post = methodWrapper("post" /* AppMethods.POST */);
