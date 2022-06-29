import { Schema, model } from 'mongoose';
import { schemaToJSONOptions } from './shared';

export interface IUser {
  name: string;
  typing?: boolean;
}

export const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    typing: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  },
);

userSchema.set('toJSON', schemaToJSONOptions);

export const User = model('User', userSchema);
