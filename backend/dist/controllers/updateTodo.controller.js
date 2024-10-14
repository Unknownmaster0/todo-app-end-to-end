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
exports.updateTodo = void 0;
const client_1 = require("@prisma/client");
const ApiResponse_1 = require("../utils/ApiResponse");
const prisma = new client_1.PrismaClient();
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const todoId = Number(req.params.id);
    try {
        const todo = yield prisma.todo.findFirst({
            where: {
                id: todoId,
            },
        });
        if (!todo) {
            return res.status(404).json(new ApiResponse_1.ApiResponse({
                statusCode: 404,
                message: 'todo not found',
                data: '',
            }));
        }
        const updatedTodo = yield prisma.todo.update({
            where: {
                id: todoId,
            },
            data: {
                done: !todo.done
            }
        });
        return res.status(200).json(new ApiResponse_1.ApiResponse({
            statusCode: 200,
            message: 'todo updated successfully',
            data: updatedTodo,
        }));
    }
    catch (error) {
        return res.status(500).json(new ApiResponse_1.ApiResponse({
            statusCode: 500,
            message: 'error while updating todo in db',
            data: error instanceof client_1.Prisma.PrismaClientKnownRequestError
                ? error.message
                : '',
        }));
    }
});
exports.updateTodo = updateTodo;
