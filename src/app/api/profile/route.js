import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { User } from '@/models/User';
import { UserInfo } from '@/models/UserInfo';

export async function PUT(req) {
  mongoose.connect(process.env.MONGO_URL);
  const data = await req.json();
  const { _id, name, image, ...otherUserInfo } = data;

  let filter = {};
  // editing someone's profile
  if (_id) {
    filter = { _id };
  }
  // editing own profile
  else {
    const session = await getServerSession(authOptions);
    const email = session.user.email;
    filter = { email };
  }

  await User.updateOne(filter, { name, image });
  await UserInfo.findOneAndUpdate(filter, otherUserInfo, { upsert: true }); // upset will create the user if not found?

  return Response.json(true);
}

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  let filter = {};
  // editing someone's profile
  if (_id) {
    filter = { _id };
  }
  // editing own profile
  else {
    const session = await getServerSession(authOptions);
    const email = session?.user?.email;
    if (!email) {
      return Response.json({});
    }
    filter = { email };
  }

  const user = await User.findOne(filter).lean();
  const userInfo = await UserInfo.findOne({email:user.email}).lean();

  return Response.json({ ...user, ...userInfo });
}
