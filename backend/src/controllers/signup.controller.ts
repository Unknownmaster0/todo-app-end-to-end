import { PrismaClient } from '@prisma/client';
import { Request, Response, RequestHandler } from 'express';
import { z } from 'zod';
import { ApiResponse } from '../utils/ApiResponse';
import jwt from 'jsonwebtoken';
const prisma = new PrismaClient();

const signupZodSchema = z.object({
  firstname: z.string().min(1, { message: 'must not empty' }),
  lastname: z.string().min(1, { message: 'must not empty' }),
  email: z.string().email(),
  password: z.string().min(1, { message: 'must not empty' }),
});

export const signup: RequestHandler = async function (
  req: Request,
  res: Response
) {
  // validation of the req body
  const isValid = signupZodSchema.safeParse(req.body);
  // if validation fails -> return 404 error message.
  if (!isValid.success) {
    res.status(404).json(
      new ApiResponse<object>({
        statusCode: 404,
        message: 'invalid signature',
        data: isValid.error.errors,
      })
    );
    return;
  }
  // if validation corrects then make user in db and give message to the user.
  try {
    const { firstname, lastname, email, password } = isValid.data;
    const user = await prisma.user.create({
      data: { firstname, lastname, email, password },
    });

    // env file checks.
    let secretKey: string = '';
    if (process.env.SECRET_KEY_JWT) {
      secretKey = process.env.SECRET_KEY_JWT;
    } else {
      res.status(500).json(
        new ApiResponse<string>({
          statusCode: 500,
          message: 'Invalid secret key',
          data: '',
        })
      );
      console.error(`not find the secret token in the env file`);
      return;
    }

    const token = jwt.sign(
      { firstname, lastname, email, id: user.id },
      secretKey
    );

    res.status(200).json(
      new ApiResponse<string>({
        statusCode: 200,
        message: 'User created successfully',
        data: `Bearer ${token}`,
      })
    );
    return;
  } catch (error) {
    res.status(500).json(
      new ApiResponse<string>({
        statusCode: 500,
        message: 'error creating user',
        data: error instanceof Error ? error.message : '',
      })
    );
  }
};
