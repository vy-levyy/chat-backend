import express from 'express';
import { UserController } from '../controllers';

const userRouter = express.Router();

userRouter.post('/create', UserController.createUser);

export { userRouter };
