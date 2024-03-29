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
exports.imageExistsValidation = void 0;
const ErrorHandler_1 = require("../custom/ErrorHandler");
const FilesFactory_1 = require("../../../utils/FilesFactory");
const imageExistsValidation = () => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const query = req.query;
            const fullImageExist = yield FilesFactory_1.FileFactory.doesFullImageExist(query.filename);
            const thumbImageExist = yield FilesFactory_1.FileFactory.doesThumbImageExist(query);
            // if(true)
            //     throw new CustomError('OVO RADIIIII', 422);
            next();
        }
        catch (err) {
            if (err instanceof ErrorHandler_1.CustomError) {
                next(err);
            }
        }
    });
};
exports.imageExistsValidation = imageExistsValidation;
