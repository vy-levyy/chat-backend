import mongoose from 'mongoose';
import { CONFIG_NOT_INITIALIZED } from '../errors/constants';

export class DB {
  public static async connect(): Promise<void> {
    const serverAddress = process.env.SERVER_ADDRESS;

    if (!serverAddress) {
      throw new Error(CONFIG_NOT_INITIALIZED);
    }

    try {
      await mongoose.connect(serverAddress);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}
