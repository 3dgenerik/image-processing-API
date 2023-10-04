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
let ImagesController = class ImagesController {
    getImages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = req.query;
            const fullImageExist = yield FilesFactory_1.FileFactory.doesFullImageExist(query.filename);
            const thumbImageExist = yield FilesFactory_1.FileFactory.doesThumbImageExist(query);
            // if(!fullImageExist)
            // throw new CustomError(`Image ${query.filename}${FileFactory.format} doesn't exists.`, 422)
            res.sendFile(`${FilesFactory_1.FileFactory.getImageDirPath("full" /* ImageDirType.FULL */)}/${query.filename}.jpg`);
        });
    }
};
__decorate([
    (0, decorators_1.get)('/images'),
    (0, decorators_1.validator)('filename', 'width', 'height'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ImagesController.prototype, "getImages", null);
ImagesController = __decorate([
    (0, decorators_1.controller)('/api')
], ImagesController);
