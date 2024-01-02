import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: { type: String, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
    },
    image: { type: String, trim: true },
    // * fields below were transfered to UserInfo model
    // phone: { type: String },
    // streetAddress: { type: String },
    // postalCode: { type: String },
    // city: { type: String },
    // country: { type: String },
    // admin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

UserSchema.post('validate', function (user) {});

export const User = models?.User || model('User', UserSchema);
