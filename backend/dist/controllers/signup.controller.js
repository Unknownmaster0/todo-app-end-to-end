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
exports.signup = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const ApiResponse_1 = require("../utils/ApiResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const signupZodSchema = zod_1.z.object({
    firstname: zod_1.z.string().min(1, { message: 'must not empty' }),
    lastname: zod_1.z.string().min(1, { message: 'must not empty' }),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(1, { message: 'must not empty' }),
});
const signup = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = signupZodSchema.safeParse(req.body);
        if (!isValid.success) {
            res.status(404).json(new ApiResponse_1.ApiResponse({
                statusCode: 404,
                message: 'invalid signature',
                data: isValid.error.errors,
            }));
            return;
        }
        try {
            const { firstname, lastname, email, password } = isValid.data;
            const user = yield prisma.user.create({
                data: { firstname, lastname, email, password },
            });
            let secretKey = '';
            if (process.env.SECRET_KEY_JWT) {
                secretKey = process.env.SECRET_KEY_JWT;
            }
            else {
                res.status(500).json(new ApiResponse_1.ApiResponse({
                    statusCode: 500,
                    message: 'Invalid secret key',
                    data: '',
                }));
                console.error(`not find the secret token in the env file`);
                return;
            }
            const token = jsonwebtoken_1.default.sign({ firstname, lastname, email, id: user.id }, secretKey);
            res.status(200).json(new ApiResponse_1.ApiResponse({
                statusCode: 200,
                message: 'User created successfully',
                data: `Bearer ${token}`,
            }));
            return;
        }
        catch (error) {
            res.status(500).json(new ApiResponse_1.ApiResponse({
                statusCode: 500,
                message: 'error creating user',
                data: error instanceof Error ? error.message : '',
            }));
        }
    });
};
exports.signup = signup;
