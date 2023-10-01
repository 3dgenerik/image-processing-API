"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterSingleton = void 0;
const express_1 = __importDefault(require("express"));
class RouterSingleton {
    static getInstance() {
        if (!RouterSingleton.instance) {
            RouterSingleton.instance = express_1.default.Router();
        }
        return RouterSingleton.instance;
    }
}
exports.RouterSingleton = RouterSingleton;
