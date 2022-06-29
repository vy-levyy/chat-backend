/* eslint-disable no-param-reassign */
/* eslint-disable no-underscore-dangle */
export const schemaToJSONOptions = {
  virtuals: true,
  transform: (_: any, ret: any) => {
    delete ret.__v;
    ret.id = ret._id.toString();
    delete ret._id;
  },
};
