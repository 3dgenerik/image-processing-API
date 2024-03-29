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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFactory = void 0;
const path_1 = __importDefault(require("path"));
const fs_1 = require("fs");
class FileFactory {
    //switch between FULL and THUMB dir paths
    static getImageDirPath(type) {
        switch (type) {
            case "full" /* ImageDirType.FULL */:
                return FileFactory.fullImagesDirPath;
            case "thumb" /* ImageDirType.THUMB */:
                return FileFactory.thumbImagesDirPath;
            default:
                throw new Error('Wrong dir type. Please use FULL or THUMB instead.');
        }
    }
    //get FULL or THUMB image names in folder
    static getImageNames(dirType) {
        return __awaiter(this, void 0, void 0, function* () {
            const fullDirPath = FileFactory.getImageDirPath(dirType);
            const allFiles = (yield fs_1.promises.readdir(fullDirPath)).map((imageName) => imageName.split('.')[0]);
            try {
                yield fs_1.promises.access(fullDirPath);
                return allFiles || [];
            }
            catch (_a) {
                return null;
            }
        });
    }
    //does full image exist
    static doesFullImageExist(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!filename) {
                return false;
            }
            const fullImageNameArray = yield FileFactory.getImageNames("full" /* ImageDirType.FULL */);
            if (fullImageNameArray)
                return fullImageNameArray.includes(filename);
            else
                return false;
        });
    }
    //creeate thumbFullName
    static thumbFileName(query) {
        return `${query.filename}_thumb_${query.width}x${query.height}`;
    }
    //does thumb image exist
    static doesThumbImageExist(query) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!query) {
                return false;
            }
            const thumbImageName = FileFactory.thumbFileName(query);
            const thumbImageNameArray = yield FileFactory.getImageNames("thumb" /* ImageDirType.THUMB */);
            if (thumbImageNameArray)
                return thumbImageNameArray.includes(thumbImageName);
            else
                return false;
        });
    }
    static thumbImageMainPath(query) {
        const thumbFileName = FileFactory.thumbFileName(query);
        const thumbDirPath = FileFactory.getImageDirPath("thumb" /* ImageDirType.THUMB */);
        return `${path_1.default.join(thumbDirPath, thumbFileName)}${FileFactory.format}`;
    }
    static fullImageMainPath(filename) {
        const imageDirPath = FileFactory.getImageDirPath("full" /* ImageDirType.FULL */);
        return `${path_1.default.join(imageDirPath, filename)}${FileFactory.format}`;
    }
    static ifThumbDirExist(dirPath) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield fs_1.promises.access(dirPath);
                return true;
            }
            catch (_a) {
                return false;
            }
        });
    }
    static createThumbDir() {
        return __awaiter(this, void 0, void 0, function* () {
            const thumbPath = FileFactory.getImageDirPath("thumb" /* ImageDirType.THUMB */);
            const ifThumbDirExist = yield FileFactory.ifThumbDirExist(thumbPath);
            if (!ifThumbDirExist) {
                console.log(`Missing thumb folder. Creating...`);
                fs_1.promises.mkdir(thumbPath);
            }
        });
    }
}
exports.FileFactory = FileFactory;
FileFactory.format = '.jpg';
FileFactory.fullImagesDirPath = path_1.default.join(__dirname, '../public/images/full');
FileFactory.thumbImagesDirPath = path_1.default.join(__dirname, '../public/images/thumb');
