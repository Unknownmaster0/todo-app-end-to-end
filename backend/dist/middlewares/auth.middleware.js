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
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const ApiResponse_1 = require("../utils/ApiResponse");
const authMiddleware = function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const tokenPayload = req.header('Authorization');
        if (!tokenPayload) {
            return res.status(401).json(new ApiResponse_1.ApiResponse({
                statusCode: 401,
                message: 'Authorization token is missing or invalid.',
                data: '',
            }));
        }
        const token = tokenPayload.split(' ')[1];
        try {
            const payload = jsonwebtoken_1.default.decode(token);
            if (!payload) {
                return res.status(404).json(new ApiResponse_1.ApiResponse({
                    statusCode: 404,
                    message: 'Invalid token',
                    data: '',
                }));
            }
            req.id = payload.id;
            next();
        }
        catch (error) {
            return res.status(500).json(new ApiResponse_1.ApiResponse({
                statusCode: 500,
                message: 'error with db',
                data: error instanceof Error ? error.message : error,
            }));
        }
    });
};
exports.authMiddleware = authMiddleware;
