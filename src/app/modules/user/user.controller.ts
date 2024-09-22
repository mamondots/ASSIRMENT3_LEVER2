import { Request, Response } from 'express';
import { userService } from './user.service';
import httpStatus from 'http-status';
import catchAsync from '../../utilites/catchAsync';
import sendResponse from '../../utilites/sendResponse';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const user = req.body;
  const result = await userService.createUserInToBD(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'successfully create user',
    data: result,
  });
});

const getAllUser = catchAsync(async (req: Request, res: Response) => {
  const result = await userService.getAllUsersInToBD();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'users retrieved succesfully',
    data: result,
  });
});

export const userController = {
  createUser,
  getAllUser,
};
