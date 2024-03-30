import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { Order } from '@/models/Order';
import mongoose from 'mongoose';
import { getServerSession } from 'next-auth';
import { isAdmin } from '../auth/[...nextauth]/route';

export async function GET(req) {
  mongoose.connect(process.env.MONGO_URL);

  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;

  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');

  // return specific order Items
  if (_id) {
    try {
      return Response.json(await Order.findById(_id));
    } catch (error) {
      console.log('Error finding order with this id', error);
      return new Response(null, { status: 500 });
    }
  }

  const admin = await isAdmin();

  // return all orders to be managed by admin
  if (admin) {
    return Response.json(await Order.find());
  }

  // return all order for the user
  if (userEmail) {
    return Response.json(await Order.find({ userEmail }));
  }
}
