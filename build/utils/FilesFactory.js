"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileFactory = void 0;
const path_1 = __importDefault(require("path"));
class FileFactory {
    static getFullImageDirsPath() {
        return FileFactory.fullImagesDirPath;
    }
    static getThumbImageDirsPath() {
        return FileFactory.thumbImagesDirPath;
    }
}
exports.FileFactory = FileFactory;
FileFactory.fullImagesDirPath = path_1.default.join(__dirname, '../../public/images/full');
FileFactory.thumbImagesDirPath = path_1.default.join(__dirname, '../../public/images/thumb');
