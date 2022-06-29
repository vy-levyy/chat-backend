import express from 'express';
import { MessageController } from '../controllers';

const messageRouter = express.Router();

messageRouter.get('/', MessageController.getAll);

export { messageRouter };
