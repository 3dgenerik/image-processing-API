"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
const decorators_1 = require("./decorators");
const FilesFactory_1 = require("../utils/FilesFactory");
const ImageProcessFacory_1 = require("../utils/ImageProcessFacory");
const ErrorHandler_1 = require("./utils/custom/ErrorHandler");
let ImagesController = class ImagesController {
    getImages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let isImageProcess = true;
                const query = req.query;
                const thumbImageExist = yield FilesFactory_1.FileFactory.doesThumbImageExist(query);
                const mainFullImagePath = FilesFactory_1.FileFactory.fullImageMainPath(query.filename);
                const mainThumbImagePath = FilesFactory_1.FileFactory.thumbImageMainPath(query);
                const processImageParameters = {
                    sourceFile: mainFullImagePath,
                    targetFile: mainThumbImagePath,
                    width: Number(query.width),
                    height: Number(query.height),
                };
                if (!thumbImageExist) {
                    console.log(`Image ${FilesFactory_1.FileFactory.thumbFileName(query)}${FilesFactory_1.FileFactory.format} not exists. Creating images...`);
                    isImageProcess = yield ImageProcessFacory_1.ImageProcessFactory.processImage(processImageParameters);
                }
                else {
                    console.log(`Image ${FilesFactory_1.FileFactory.thumbFileName(query)}${FilesFactory_1.FileFactory.format} already exists.`);
                }
                if (!isImageProcess)
                    throw new ErrorHandler_1.CustomError(`Ooops, can't create image.`, 422);
                res.sendFile(mainThumbImagePath);
            }
            catch (err) {
                if (err instanceof ErrorHandler_1.CustomError) {
                    next(err);
                }
            }
        });
    }
};
__decorate([
    (0, decorators_1.get)('/images'),
    (0, decorators_1.validator)('filename', 'width', 'height'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImages", null);
ImagesController = __decorate([
    (0, decorators_1.controller)('/api')
], ImagesController);
