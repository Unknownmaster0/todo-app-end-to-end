import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { Response } from 'express';
import { CustomRequest } from '../middlewares/auth.middleware';
import { ApiResponse } from '../utils/ApiResponse';
const prisma = new PrismaClient();

const todoInputSchema = z.object({
  title: z.string().min(1, { message: 'not be empty' }),
  description: z.string().min(1, { message: 'not be empty' }),
});

export type todoInput = {
  title: string;
  description: string;
};

export const addTodo: any = async function (req: CustomRequest, res: Response) {
  const isValidInput = todoInputSchema.safeParse(req.body);

  if (!isValidInput) {
    return res.status(404).json(
      new ApiResponse<string>({
        statusCode: 404,
        message: 'Invalid input',
        data: '',
      })
    );
  }

  const todoInput: todoInput = req.body;
  const userId: number = req.id;

  try {
    const addedTodo = await prisma.todo.create({
      data: {
        title: todoInput.title,
        description: todoInput.description,
        userId,
      },
    });

    return res.status(200).json(
      new ApiResponse<object>({
        statusCode: 200,
        message: 'todo added successfully',
        data: addedTodo,
      })
    );
  } catch (error) {
    return res.status(500).json(
      new ApiResponse<string>({
        statusCode: 500,
        message: 'not able to connect with db',
        data: '',
      })
    );
  }
};
