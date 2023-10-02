"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParamsValidation = void 0;
const ErrorHandler_1 = require("../custom/ErrorHandler");
const isPositivInt = (size, dim) => {
    if (Number.isNaN(size) || size < 1) {
        throw new ErrorHandler_1.CustomError(`${dim} must be positive integer`, 422);
    }
};
const queryParamsValidation = (keys) => {
    return (req, res, next) => {
        const query = req.query;
        const width = parseInt(query.width);
        const height = parseInt(query.height);
        let invalidQueryParams = [];
        if (!query) {
            throw new ErrorHandler_1.CustomError('Invalid request', 422);
        }
        for (const key of keys) {
            if (!query[key]) {
                invalidQueryParams.push(key);
            }
        }
        if (invalidQueryParams.length > 0)
            throw new ErrorHandler_1.CustomError(`Invalid request. Missing query parameters: ${[...invalidQueryParams].join(', ')}`, 422);
        isPositivInt(width, "width");
        isPositivInt(height, "height");
        next();
    };
};
exports.queryParamsValidation = queryParamsValidation;
