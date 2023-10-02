"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParamsValidation = void 0;
const queryParamsValidation = (keys) => {
    return (req, res, next) => {
        throw new Error('GRESKAA');
        if (!req.query) {
            res.status(422).send('Please type ');
            return;
        }
        next();
    };
};
exports.queryParamsValidation = queryParamsValidation;
