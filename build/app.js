"use strict";
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
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(constants_1.constants.publicPath));
app.use(RouterSingleton_1.RouterSingleton.getInstance());
app.use(errorMiddleware_1.errorHandler);
app.listen(PORT, () => {
    console.log(`...listening port ${PORT}`);
});
exports.default = app;
