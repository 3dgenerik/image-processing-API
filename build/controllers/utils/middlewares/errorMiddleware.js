"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandlerMiddleware = void 0;
const errorHandlerMiddleware = (err, req, res, 
// eslint-disable-next-line @typescript-eslint/no-unused-vars
next) => {
    const error = err.formatError().error;
    res.status(error.statusCode || 500).send(error.message);
};
exports.errorHandlerMiddleware = errorHandlerMiddleware;
