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
exports.signin = void 0;
const client_1 = require("@prisma/client");
const zod_1 = require("zod");
const ApiResponse_1 = require("../utils/ApiResponse");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
const signinZodSchema = zod_1.z.object({
    email: zod_1.z.string().email().min(1, { message: 'must not empty' }),
    password: zod_1.z.string().min(1, { message: 'must not empty' }),
});
const signin = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const isValid = signinZodSchema.safeParse(req.body);
        if (!isValid.success) {
            res.status(403).json(new ApiResponse_1.ApiResponse({
                statusCode: 403,
                message: 'Invalid input',
                data: isValid.error.errors,
            }));
            return;
        }
        const { email, password } = isValid.data;
        try {
            const user = yield prisma.user.findFirst({
                where: {
                    email,
                },
            });
            if (!user) {
                res.status(404).json(new ApiResponse_1.ApiResponse({
                    statusCode: 404,
                    message: 'User not found',
                    data: '',
                }));
                return;
            }
            if (user.password !== password) {
                res.status(404).json(new ApiResponse_1.ApiResponse({
                    statusCode: 404,
                    message: 'password not matched',
                    data: '',
                }));
                return;
            }
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
            const token = jsonwebtoken_1.default.sign({
                email,
                firstname: user.firstname,
                lastname: user.lastname,
                id: user.id,
            }, secretKey);
            res.status(200).json(new ApiResponse_1.ApiResponse({
                statusCode: 200,
                message: 'user logged in successfully',
                data: `Bearer ${token}`,
            }));
            return;
        }
        catch (error) {
            res.status(500).json(new ApiResponse_1.ApiResponse({
                statusCode: 500,
                message: 'error while getting data from db',
                data: error instanceof Error ? error.message : '',
            }));
        }
    });
};
exports.signin = signin;
