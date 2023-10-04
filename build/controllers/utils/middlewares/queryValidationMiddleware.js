"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParamsValidation = void 0;
const ErrorHandler_1 = require("../custom/ErrorHandler");
const isPositivInt = (size, dim) => {
    if (Number.isNaN(size) || size < 1) {
        throw new ErrorHandler_1.CustomError(`${dim} must be positive integer`, 422);
    }
};
const queryParamsValidation = (keys) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        if (Object.keys(query).length > 0) {
            isPositivInt(width, "width");
            isPositivInt(height, "height");
        }
        next();
    });
};
exports.queryParamsValidation = queryParamsValidation;
