import { Schema, model, models } from 'mongoose';

const UserInfoSchema = new Schema(
  {
    email: { type: String, required: true, trim: true },
    phone: { type: String, trim: true },
    streetAddress: { type: String, trim: true },
    postalCode: { type: String, trim: true },
    city: { type: String, trim: true },
    country: { type: String, trim: true },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const UserInfo = models?.UserInfo || model('UserInfo', UserInfoSchema);
