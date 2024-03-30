import * as mongoose from 'mongoose';
import { User } from '@/models/User';
import * as bcrypt from 'bcrypt';
import NextAuth, { getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { MongoDBAdapter } from '@auth/mongodb-adapter';
import clientPromise from '@/libs/mongoConnect';
import { UserInfo } from '@/models/UserInfo';

export const authOptions = {
  secret: process.env.NEXT_AUTH_SECRET,
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: 'jwt',
    // strategy: 'database',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      id: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'email',
          placeholder: 'test@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // const { email, password } = credentials;  // it was causing the login bug
        const email = credentials?.email;
        const password = credentials?.password;

        mongoose.connect(process.env.MONGO_URL);
        const user = await User.findOne({ email });

        if (!user) {
          console.log('User not found:', email);
          return null;
        }

        const passwordOk = bcrypt.compareSync(password, user.password);

        // console.log('nextauth running...');
        // console.log('credentials:', credentials);
        // console.log('user found:', user);
        // console.log('password comparison:', password, user.password);
        // console.log({ passwordOk });

        if (passwordOk) return user;

        return null;
      },
    }),
  ],
};

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  const userEmail = session?.user?.email;
  if (!userEmail) {
    return false;
  }

  const userInfo = await UserInfo.findOne({ email: userEmail });

  if (!userInfo) {
    return false;
  }

  return userInfo.admin;
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
