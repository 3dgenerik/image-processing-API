"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controller = void 0;
require("reflect-metadata");
const RouterSingleton_1 = require("../../RouterSingleton");
const queryValidationMiddleware_1 = require("../utils/middlewares/queryValidationMiddleware");
const controller = (routePrefix) => {
    return (target) => {
        const router = RouterSingleton_1.RouterSingleton.getInstance();
        const targetPrototypeNames = Object.getOwnPropertyNames(target.prototype);
        for (const key of targetPrototypeNames) {
            const path = Reflect.getMetadata("path" /* AppFeatures.PATH */, target.prototype, key);
            const method = Reflect.getMetadata("method" /* AppFeatures.METHOD */, target.prototype, key);
            const middleware = Reflect.getMetadata("middleware" /* AppFeatures.MIDDLEWARE */, target.prototype, key) || [];
            const validation = Reflect.getMetadata("validator" /* AppFeatures.VALIDATOR */, target.prototype, key) || [];
            if (path && method) {
                router[method](`${routePrefix}${path}`, [...middleware], (0, queryValidationMiddleware_1.queryParamsValidation)(validation), target.prototype[key]);
            }
        }
    };
};
exports.controller = controller;
