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
Object.defineProperty(exports, "__esModule", { value: true });
const decorators_1 = require("./decorators");
const constants_1 = require("../constants");
let ImagesController = class ImagesController {
    getImages(req, res) {
        // res.send('images')
        res.sendFile(`${constants_1.constants.publicPath}/full/fjord.jpg`);
    }
};
__decorate([
    (0, decorators_1.get)('/images'),
    (0, decorators_1.validator)('filename', 'width', 'height'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ImagesController.prototype, "getImages", null);
ImagesController = __decorate([
    (0, decorators_1.controller)('/api')
], ImagesController);