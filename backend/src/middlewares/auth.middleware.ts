import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { ApiResponse } from '../utils/ApiResponse';

export interface CustomRequest extends Request {
  id: number;
}

export const authMiddleware: any = async function (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const tokenPayload = req.header('Authorization');
  if (!tokenPayload) {
    return res.status(401).json(
      new ApiResponse<string>({
        statusCode: 401,
        message: 'Authorization token is missing or invalid.',
        data: '',
      })
    );
  }

  const token = tokenPayload.split(' ')[1];

  try {
    const payload = jwt.decode(token) as {
      email: string;
      firstname: string;
      lastname: string;
      id: number;
    } | null;

    if (!payload) {
      return res.status(404).json(
        new ApiResponse<string>({
          statusCode: 404,
          message: 'Invalid token',
          data: '',
        })
      );
    }

    req.id = payload.id;
    next();
  } catch (error) {
    return res.status(500).json(
      new ApiResponse({
        statusCode: 500,
        message: 'error with db',
        data: error instanceof Error ? error.message : error,
      })
    );
  }
};
