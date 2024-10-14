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
exports.addTodo = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const ApiResponse_1 = require("../utils/ApiResponse");
const prisma = new client_1.PrismaClient();
const todoInputSchema = zod_1.z.object({
    title: zod_1.z.string().min(1, { message: 'not be empty' }),
    description: zod_1.z.string().min(1, { message: 'not be empty' }),
});
const addTodo = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValidInput = todoInputSchema.safeParse(req.body);
        if (!isValidInput) {
            return res.status(404).json(new ApiResponse_1.ApiResponse({
                statusCode: 404,
                message: 'Invalid input',
                data: '',
            }));
        }
        const todoInput = req.body;
        const userId = req.id;
        try {
            const addedTodo = yield prisma.todo.create({
                data: {
                    title: todoInput.title,
                    description: todoInput.description,
                    userId,
                },
            });
            return res.status(200).json(new ApiResponse_1.ApiResponse({
                statusCode: 200,
                message: 'todo added successfully',
                data: addedTodo,
            }));
        }
        catch (error) {
            return res.status(500).json(new ApiResponse_1.ApiResponse({
                statusCode: 500,
                message: 'not able to connect with db',
                data: '',
            }));
        }
    });
};
exports.addTodo = addTodo;
