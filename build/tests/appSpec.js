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
const app_1 = __importDefault(require("../app"));
const supertest_1 = __importDefault(require("supertest"));
const request = (0, supertest_1.default)(app_1.default);
describe('Testing endpoints: ', () => {
    describe('Testing "/" endpoint: ', () => {
        it('"/" - status code should be 200: ', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield request.get('/');
            expect(result.status).toBe(200);
        }));
    });
    describe('Testing "/api/images" endpoint: ', () => {
        it('"/api/images" - status code should be 422 ', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield request.get('/api/images');
            expect(result.status).toBe(422);
        }));
    });
    describe('Testing "/api/images" endpoint: ', () => {
        it('"/api/images" - text should be "You need to provide missing query parameters: filename, width, height" ', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield request.get('/api/images');
            expect(result.text).toEqual("You need to provide missing query parameters: filename, width, height");
            expect(result.status).toBe(422);
        }));
    });
    describe('Testing "/api/images?filename=fjord&width=200&height=200" endpoint: ', () => {
        it('"/api/images?filename=fjord&width=200&height=200" - status code should be 200" ', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield request.get('/api/images?filename=fjord&width=200&height=200');
            expect(result.status).toBe(200);
        }));
    });
    describe('Testing "/api/images?filename=wrong-name&width=200&height=200" endpoint: ', () => {
        it('"/api/images?filename=wrong-name&width=200&height=200" - text should be "Filename "wrong-name" doesn t exist. Please use one of these filenames: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica." ', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield request.get('/api/images?filename=wrong-name&width=200&height=200');
            expect(result.text).toEqual(`Filename "wrong-name" doesn't exist. Please use one of these filenames: encenadaport, fjord, icelandwaterfall, palmtunnel, santamonica.`);
            expect(result.status).toBe(422);
        }));
    });
    describe('Testing "/api/images?filename=fjord&width=200&height=-200" endpoint: ', () => {
        it('"/api/images?filename=fjord&width=200&height=-200" - text should be "Invalid request: height has invalid parameter value. Please use positive integer instead." ', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield request.get('/api/images?filename=fjord&width=200&height=-200');
            expect(result.text).toEqual(`Invalid request: height has invalid parameter value. Please use positive integer instead.`);
            expect(result.status).toBe(422);
        }));
    });
    describe('Testing "/api/images?filename=fjord&width=&height=" endpoint: ', () => {
        it('"/api/images?filename=fjord&width=&height=" - text should be "You need to provide missing query parameters: width, height." ', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield request.get('/api/images?filename=fjord&width=&height=');
            expect(result.text).toEqual(`You need to provide missing query parameters: width, height`);
            expect(result.status).toBe(422);
        }));
    });
    describe('Testing "/something-wrong: ', () => {
        it('"/something-wrong" - status code should be 404" ', () => __awaiter(void 0, void 0, void 0, function* () {
            const result = yield request.get('/something-wrong');
            expect(result.status).toBe(404);
        }));
    });
});
