import { Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomRequest } from '../middlewares/auth.middleware';
import { ApiResponse } from '../utils/ApiResponse';

const prisma = new PrismaClient();

export const getAllTodos: any = async (req: CustomRequest, res: Response) => {
  const userId = req.id;
  // get all the todos of that userid.

  try {
    const todos = await prisma.todo.findMany({
      where: {
        userId: userId,
      },
    });

    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });

    return res.status(200).json(
      new ApiResponse<object>({
        statusCode: 200,
        message: 'success',
        data: {
          todos,
          username: `${user?.firstname} ${user?.lastname}`,
        },
      })
    );
  } catch (err) {
    return res.status(500).json(
      new ApiResponse<string>({
        statusCode: 500,
        message: 'internal error while getting todos',
        data: err instanceof Error ? err.message : '',
      })
    );
  }
};
