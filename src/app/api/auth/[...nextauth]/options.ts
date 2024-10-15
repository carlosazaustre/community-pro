import { authenticateUser } from '@/auth/services/AuthService';
import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Tu nombre de usuario' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await authenticateUser(credentials);

        if (user) {
          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email,
            username: user.username,
          };
        }

        return null;
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
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.username = user.username ?? user.name ?? 'unknown';
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },

  session: {
    strategy: 'jwt',
  },
};
