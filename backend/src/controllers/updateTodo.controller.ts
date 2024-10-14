import { Response } from 'express';
import { CustomRequest } from '../middlewares/auth.middleware';
import { Prisma, PrismaClient } from '@prisma/client';
import { ApiResponse } from '../utils/ApiResponse';

const prisma = new PrismaClient();

export const updateTodo: any = async (req: CustomRequest, res: Response) => {
  const todoId: number = Number(req.params.id);
  try {
    //   if any todo id not matched with the todoId, then return false.
    // else update the todo done by toggeling the done of the todo.
    const todo = await prisma.todo.findFirst({
      where: {
        id: todoId,
      },
    });

    if (!todo) {
      return res.status(404).json(
        new ApiResponse({
          statusCode: 404,
          message: 'todo not found',
          data: '',
        })
      );
    }

    const updatedTodo = await prisma.todo.update({
      where: {
        id: todoId,
      }, 
      data:{
        done: !todo.done
      }
    })

    return res.status(200).json(
      new ApiResponse({
        statusCode: 200,
        message: 'todo updated successfully',
        data: updatedTodo,
      })
    );
  } catch (error) {
    return res.status(500).json(
      new ApiResponse<string>({
        statusCode: 500,
        message: 'error while updating todo in db',
        data:
          error instanceof Prisma.PrismaClientKnownRequestError
            ? error.message
            : '',
      })
    );
  }
};
