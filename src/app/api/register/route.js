import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import { User } from '@/models/User';

export async function POST(req) {
  mongoose.connect(process.env.MONGO_URL);
  const body = await req.json();
  const pass = body.password
  if (!pass?.length || pass.length < 5) {
    new Error('password must be at least 5 characters');
  }

  const salt = bcrypt.genSaltSync(10);
  body.password = bcrypt.hashSync(pass, salt)

  const createdUser = await User.create(body);
  return Response.json(createdUser);
}
