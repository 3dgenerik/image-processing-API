"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.constants = void 0;
const path_1 = __importDefault(require("path"));
exports.constants = {
    prefixPath: '/api',
    publicPath: path_1.default.join(__dirname, '../public/images'),
    apiImages: '/api/images',
};
