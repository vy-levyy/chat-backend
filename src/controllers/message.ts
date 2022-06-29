import { Request, Response } from 'express';
import { Message } from '../models';

export class MessageController {
  public static async getAll(_: Request, res: Response): Promise<void> {
    const messages = await Message.find();

    res.send(messages);
  }
}
