import mongoose from 'mongoose';
import { Category } from '../../../models/Category';
import { isAdmin } from '../auth/[...nextauth]/route';

export async function POST(req) {
  if (!(await isAdmin())) {
    return Response.json({});
  }
  mongoose.connect(process.env.MONGO_URL);
  const { name } = await req.json();
  const categoryDoc = await Category.create({ name });
  return Response.json(categoryDoc);
}

export async function PUT(req) {
  if (!(await isAdmin())) {
    return Response.json(true);
  }
  mongoose.connect(process.env.MONGO_URL);
  const { _id, name } = await req.json();
  await Category.updateOne({ _id }, { name });
  return Response.json(true);
}

export async function GET() {
  mongoose.connect(process.env.MONGO_URL);
  return Response.json(await Category.find());
}

export async function DELETE(req) {
  if (!(await isAdmin())) {
    return Response.json(true);
  }
  mongoose.connect(process.env.MONGO_URL);
  const url = new URL(req.url);
  const _id = url.searchParams.get('_id');
  await Category.deleteOne({ _id });
  return Response.json(true);
}
