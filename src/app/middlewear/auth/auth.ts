import { NextFunction, Request, Response } from 'express';
import { JwtPayload } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { User } from '../../modules/user/user.model';
import sendResponse from '../../utilites/sendResponse';
import httpStatus from 'http-status';

const auth = (...roles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization;

      // checking if the token is missing
      if (!token) {
        throw new Error('You are not autilizid');
      }

      const solidToken = token?.split(' ')[1];

      if (token?.split(' ')[0] !== 'Bearer') {
        sendResponse(res, {
          statusCode: httpStatus.UNAUTHORIZED,
          success: false,
          message: 'You have no access to this route',
          data: undefined,
        });
      }

      // if the token exists
      if (!token) {
        sendResponse(res, {
          statusCode: httpStatus.UNAUTHORIZED,
          success: false,
          message: 'You have no access to this route',
          data: undefined,
        });
      }

      // checking if the given token is valid
      const decoded = jwt.verify(
        solidToken as string,
        config.jwt_acess_token_secret as string,
      ) as JwtPayload;

      const { email, role } = decoded;

      // checking if the user is exist
      const user = await User.findOne({ email: email });

      if (!user) {
        throw new Error('user is not found !');
      }

      if (roles && !roles.includes(role)) {
        return res.status(401).json({
          success: false,
          statusCode: 401,
          message: 'You have no access to this route',
        });
      }

      req.user = decoded as JwtPayload;
      next();
    } catch (error) {
      next(error);
    }
  };
};

export default auth;
