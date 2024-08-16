import express from 'express';
import validateRequest from '../../middlewear/validateRequest';
import { validateUser } from '../user/user.vlidation';
import { AuthValidation } from './auth.validation';
import { userController } from '../user/user.controller';
import { authControllers } from './auth.controller';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(validateUser.createUserValidation),
  userController.createUser,
);

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  authControllers.login,
);

export const AuthRoutes = router;
