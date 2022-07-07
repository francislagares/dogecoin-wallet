import { MongoClient } from 'mongodb';
import NextAuth from 'next-auth';
import CredentialProvider from 'next-auth/providers/credentials';

// const prisma = new PrismaClient();

export default NextAuth({
  // adapter: PrismaAdapter(prisma), doesn't work with CredentialsProvider

  providers: [
    CredentialProvider({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        username: {
          label: 'Email',
          type: 'text',
          placeholder: 'johndoe@test.com',
        },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async credentials => {
        // database look up
        const client = await MongoClient.connect(
          process.env.DATABASE_URL as string,
        );
        const user = await client
          .db()
          .collection('User')
          .findOne({ email: 'dogecoin@test.com' });

        if (!user) {
          throw new Error('User not found!');
        }

        if (
          credentials?.username === user?.email &&
          credentials?.password === user?.password
        ) {
          return user;
        }

        // login failed
        return null;
      },
    }),
  ],
  /* pages: {
    signIn: '/auth/signin',
  }, */
  session: {
    // reference: https://next-auth.js.org/configuration/options#session
    strategy: 'jwt',

    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  },
  callbacks: {
    jwt: ({ token, user }) => {
      // first time jwt callback is run, user object is available
      if (user) {
        token.id = user.id;
      }

      return token;
    },
    session: ({ session, token }) => {
      if (token) {
        session.id = token.id;
      }

      return session;
    },
  },
  secret: process.env.AUTH_SECRET,
  jwt: {
    secret: process.env.AUTH_SECRET,
  },
});
