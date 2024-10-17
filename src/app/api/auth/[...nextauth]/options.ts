import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions } from 'next-auth';
import { authenticateUser } from '@/auth/services/AuthService';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Tu nombre de usuario' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await authenticateUser({
          username: credentials.username,
          password: credentials.password,
        });

        return user;
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },

  events: {
    async signOut(message) {
      console.log('User session closed:', message);
    },
    async signIn(message) {
      console.log('User signed in:', message);
    },
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
