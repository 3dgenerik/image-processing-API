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
const express_1 = __importDefault(require("express"));
const RouterSingleton_1 = require("./RouterSingleton");
const constants_1 = require("./constants");
const errorMiddleware_1 = require("./controllers/utils/middlewares/errorMiddleware");
require("./controllers/RootController");
require("./controllers/ImagesController");
const FilesFactory_1 = require("./utils/FilesFactory");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
3;
app.use(express_1.default.static(constants_1.constants.publicPath));
app.use(RouterSingleton_1.RouterSingleton.getInstance());
app.use(errorMiddleware_1.errorHandlerMiddleware);
app.listen(PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    yield FilesFactory_1.FileFactory.createThumbDir();
    console.log(`...listening port ${PORT}`);
}));
exports.default = app;
