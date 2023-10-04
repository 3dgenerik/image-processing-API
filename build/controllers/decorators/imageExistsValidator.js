"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryValidator = void 0;
require("reflect-metadata");
const queryValidator = () => {
    return (target, key, desc) => {
        Reflect.defineMetadata("validator" /* AppFeatures.VALIDATOR */, '', target, key);
    };
};
exports.queryValidator = queryValidator;
