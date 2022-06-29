import { Request, Response } from 'express';
import { User } from '../models/user';

export class UserController {
  public static async createUser(
    req: Request<null, null, { name: string }>,
    res: Response,
  ): Promise<void> {
    const { name } = req.body;
    const user = new User({ name });

    await user.save();

    res.send({ id: user.id, name: user.name });
  }
}
