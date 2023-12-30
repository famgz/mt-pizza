
import { Schema, models, model } from 'mongoose';

const UserSchema = new Schema(
  {
    name: {type: String},
    email: { type: String, required: true, unique: true },
    password: {
      type: String,
    },
    image: {type: String},
  },
  { timestamps: true }
);

UserSchema.post('validate', function (user) {

});

export const User = models?.User || model('User', UserSchema);
