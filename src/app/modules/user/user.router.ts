import express from 'express';
import { userController } from './user.controller';
const router = express.Router();

router.post('/create_user', userController.createUser);
router.get('/user', userController.getAllUser);

export const userRoutes = router;
