import { User } from '@/models/User';
import mongoose from 'mongoose';
import { isAdmin } from '../auth/[...nextauth]/route';

export async function GET() {
  if (!(await isAdmin())) {
    return Response.json([]);
  }
  mongoose.connect(process.env.MONGO_URL);
  const users = await User.find();
  return Response.json(users);
}
