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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTodos = void 0;
const client_1 = require("@prisma/client");
const ApiResponse_1 = require("../utils/ApiResponse");
const prisma = new client_1.PrismaClient();
const getAllTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.id;
    try {
        const todos = yield prisma.todo.findMany({
            where: {
                userId: userId,
            },
        });
        const user = yield prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
        return res.status(200).json(new ApiResponse_1.ApiResponse({
            statusCode: 200,
            message: 'success',
            data: {
                todos,
                username: `${user === null || user === void 0 ? void 0 : user.firstname} ${user === null || user === void 0 ? void 0 : user.lastname}`,
            },
        }));
    }
    catch (err) {
        return res.status(500).json(new ApiResponse_1.ApiResponse({
            statusCode: 500,
            message: 'internal error while getting todos',
            data: err instanceof Error ? err.message : '',
        }));
    }
});
exports.getAllTodos = getAllTodos;
