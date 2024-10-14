"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(constructProps) {
        super(constructProps.message);
        this.statusCode = constructProps.statusCode;
        this.errors = constructProps.errors;
        this.message = constructProps.message;
        this.data = null;
        this.success = false;
        if (constructProps.stack) {
            this.stack = constructProps.stack;
        }
        else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
exports.ApiError = ApiError;
