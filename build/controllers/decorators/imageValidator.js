"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
require("reflect-metadata");
const validator = (num) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target, key, desc) => {
        Reflect.defineMetadata("validator" /* AppFeatures.VALIDATOR */, num, target, key);
    };
};
exports.validator = validator;
