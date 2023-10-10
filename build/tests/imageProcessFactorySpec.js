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
const ImageProcessFactory_1 = require("../utils/ImageProcessFactory");
const FilesFactory_1 = require("../utils/FilesFactory");
const fs_1 = require("fs");
const validName = 'fjord';
const invalidName = 'fjord12345';
const query = {
    filename: '',
    width: 777,
    height: 777
};
const thumbPath = (query) => {
    return FilesFactory_1.FileFactory.thumbImageMainPath(query);
};
const image = (filename) => {
    const validQuery = query;
    validQuery.filename = filename;
    const fullImagePath = FilesFactory_1.FileFactory.fullImageMainPath(validQuery.filename);
    const thumbImagePath = thumbPath(validQuery);
    const imageForProcessing = {
        sourceFile: fullImagePath,
        targetFile: thumbImagePath,
        width: validQuery.width,
        height: validQuery.height
    };
    return imageForProcessing;
};
fdescribe('Test image process: ', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const fullThumbPath = thumbPath(Object.assign(Object.assign({}, query), { filename: validName }));
        try {
            yield fs_1.promises.access(fullThumbPath);
            yield fs_1.promises.unlink(fullThumbPath);
        }
        catch (_a) {
            console.log('Nothing to delete.');
        }
    }));
    it('Test image process with valid query: should be true', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageForProcessing = image(validName);
        const processedImage = yield ImageProcessFactory_1.ImageProcessFactory.processImage(imageForProcessing);
        expect(processedImage).toBeTrue();
    }));
    it('Test image process with invalid query: should be false', () => __awaiter(void 0, void 0, void 0, function* () {
        const imageForProcessing = image(invalidName);
        const processedImage = yield ImageProcessFactory_1.ImageProcessFactory.processImage(imageForProcessing);
        expect(processedImage).toBeFalse();
    }));
});
