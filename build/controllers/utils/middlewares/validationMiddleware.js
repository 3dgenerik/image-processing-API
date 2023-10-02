"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParamsValidation = void 0;
const ErrorHandler_1 = require("../custom/ErrorHandler");
const queryParamsValidation = (keys) => {
    return (req, res, next) => {
        if (!req.query) {
            throw new ErrorHandler_1.CustomError('Invalid request', 422);
        }
        for (const key of keys) {
        }
        next();
    };
};
exports.queryParamsValidation = queryParamsValidation;
