"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
require("reflect-metadata");
const validator = (num) => {
    return (target, key, desc) => {
        Reflect.defineMetadata("validator" /* AppFeatures.VALIDATOR */, num, target, key);
    };
};
exports.validator = validator;
