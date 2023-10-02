"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const error = err.formatError().error;
    res.status(error.statusCode || 500).send(error.message);
};
exports.errorHandler = errorHandler;
