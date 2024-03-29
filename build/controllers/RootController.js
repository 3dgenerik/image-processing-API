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
let RootController = 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class RootController {
    getRoot(req, res) {
        const example = '/api/images?filename=fjord&width=200&height=200';
        res.setHeader('Cache-Control', 'no-store').send(`
        <p>Please go to <a href="/api/images">/api/images</a> and use correct filename with correct width and height.</p><br>
        <div>
            <h4>Example: </h4>
            <a href = ${example}>${example}</a>
        </div>
        `);
    }
};
__decorate([
    (0, decorators_1.get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], RootController.prototype, "getRoot", null);
RootController = __decorate([
    (0, decorators_1.controller)('/')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
], RootController);
