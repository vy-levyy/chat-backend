import { Schema, model } from 'mongoose';
import { schemaToJSONOptions } from './shared';

export interface IMessage {
  value: string;
  userName: string;
}

export const messageSchema = new Schema<IMessage>(
  {
    value: {
      type: String,
      required: true,
    },
    userName: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

messageSchema.set('toJSON', schemaToJSONOptions);

export const Message = model('Message', messageSchema);
