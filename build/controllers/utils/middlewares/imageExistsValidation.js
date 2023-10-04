"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imageExistsValidation = void 0;
const imageExistsValidation = () => {
    return (req, res, next) => {
        const query = req.query;
        next();
    };
};
exports.imageExistsValidation = imageExistsValidation;
