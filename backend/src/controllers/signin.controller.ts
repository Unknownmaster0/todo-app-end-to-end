import { PrismaClient } from '@prisma/client';
import { Request, Response, RequestHandler } from 'express';
import { z } from 'zod';
import { ApiResponse } from '../utils/ApiResponse';
import jwt, { Secret } from 'jsonwebtoken';

const prisma = new PrismaClient();

const signinZodSchema = z.object({
  email: z.string().email().min(1, { message: 'must not empty' }),
  password: z.string().min(1, { message: 'must not empty' }),
});

export const signin: RequestHandler = async function (
  req: Request,
  res: Response
) {
  const isValid = signinZodSchema.safeParse(req.body);
  if (!isValid.success) {
    res.status(403).json(
      new ApiResponse<object>({
        statusCode: 403,
        message: 'Invalid input',
        data: isValid.error.errors,
      })
    );
    return;
  }

  //   if valid user, then let him log in and send the token.
  const { email, password } = isValid.data;

  // go and find the user in the db
  try {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    // if not found, then return no user exist with this mail.
    if (!user) {
      res.status(404).json(
        new ApiResponse<string>({
          statusCode: 404,
          message: 'User not found',
          data: '',
        })
      );
      return;
    }
    // if found, then match the password
    // if not matched, then return wrong password.
    if (user.password !== password) {
      res.status(404).json(
        new ApiResponse<string>({
          statusCode: 404,
          message: 'password not matched',
          data: '',
        })
      );
      return;
    }
    // if matched, then return the token to the user.
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

    const token: string = jwt.sign(
      {
        email,
        firstname: user.firstname,
        lastname: user.lastname,
        id: user.id,
      },
      secretKey
    );

    res.status(200).json(
      new ApiResponse<string>({
        statusCode: 200,
        message: 'user logged in successfully',
        data: `Bearer ${token}`,
      })
    );
    return;
  } catch (error) {
    res.status(500).json(
      new ApiResponse<string>({
        statusCode: 500,
        message: 'error while getting data from db',
        data: error instanceof Error ? error.message : '',
      })
    );
  }
};
