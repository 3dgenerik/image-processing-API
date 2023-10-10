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
const FilesFactory_1 = require("../utils/FilesFactory");
const ImageProcessFactory_1 = require("../utils/ImageProcessFactory");
const fs_1 = require("fs");
describe('Test file factory: ', () => {
    const filename = 'santamonica';
    const query = {
        filename,
        width: 200,
        height: 200
    };
    const fullImagePath = FilesFactory_1.FileFactory.fullImageMainPath(filename);
    const thumbImagePath = FilesFactory_1.FileFactory.thumbImageMainPath(query);
    const isFileExists = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield fs_1.promises.access(filePath);
            return true;
        }
        catch (_a) {
            return false;
        }
    });
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const imageToCreate = {
            sourceFile: fullImagePath,
            targetFile: thumbImagePath,
            width: 200,
            height: 200
        };
        const isThumbExist = yield isFileExists(thumbImagePath);
        if (yield isFileExists(fullImagePath)) {
            if (!isThumbExist) {
                console.log(`...creating ${FilesFactory_1.FileFactory.thumbFileName(query)}${FilesFactory_1.FileFactory.format} temp file`);
                yield ImageProcessFactory_1.ImageProcessFactory.processImage(imageToCreate);
            }
            else {
                console.log(`Thumb ${FilesFactory_1.FileFactory.thumbFileName(query)}${FilesFactory_1.FileFactory.format} already exist. Skiping process image...`);
            }
        }
        else {
            console.log(`Full image ${filename} doesn't exist.`);
        }
    }));
    it('Image full path should be string and not to be null', () => {
        const imagePath = FilesFactory_1.FileFactory.getImageDirPath('full');
        expect(typeof imagePath).toBe('string');
        expect(imagePath).not.toBeNull();
    });
    it(`Image something-wrong path should reise error: 'Wrong dir type. Please use FULL or THUMB instead.'`, () => {
        expect(() => {
            FilesFactory_1.FileFactory.getImageDirPath('something-wrong');
        }).toThrowError('Wrong dir type. Please use FULL or THUMB instead.');
    });
    it('Image names array length should return more then 0 images', () => __awaiter(void 0, void 0, void 0, function* () {
        const imagesArray = (yield FilesFactory_1.FileFactory.getImageNames("full" /* ImageDirType.FULL */)) || [];
        expect(imagesArray.length).toBeGreaterThan(0);
    }));
    it('Image exist in FULL image folder', () => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield FilesFactory_1.FileFactory.doesFullImageExist(filename);
        expect(isExist).toBeTrue();
    }));
    it('Image NOT exist in FULL image folder', () => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield FilesFactory_1.FileFactory.doesFullImageExist('some-image-name');
        expect(isExist).toBeFalse();
    }));
    //file fjord_thumb_200x200.jpg should exist in THUMB folder for this test
    it('Image exist in THUMB image folder ', () => __awaiter(void 0, void 0, void 0, function* () {
        const isExist = yield FilesFactory_1.FileFactory.doesThumbImageExist(query);
        expect(isExist).toBeTrue();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        const isThumbExist = yield isFileExists(thumbImagePath);
        if (isThumbExist) {
            console.log(`...deleting ${FilesFactory_1.FileFactory.thumbFileName(query)}${FilesFactory_1.FileFactory.format} temp file`);
            yield fs_1.promises.unlink(thumbImagePath);
        }
        else {
            console.log(`Thumb doesn't exist. Skiping deleting...`);
        }
    }));
});
