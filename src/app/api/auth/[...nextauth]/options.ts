import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthOptions, User as NextAuthUser } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import {
  authenticateUser,
  setRememberMeToken,
  removeRememberMeToken,
} from '@/features/auth/services/AuthService';

interface ExtendedUser extends NextAuthUser {
  rememberMeToken?: string;
}

interface ExtendedJWT extends JWT {
  userId?: string;
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text', placeholder: 'Tu nombre de usuario' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await authenticateUser({
          username: credentials.username,
          password: credentials.password,
        });

        if (!user) {
          return null;
        }

        return {
          id: user.id,
          name: user.username,
          email: user.email,
          image: null,
        };
      },
    }),
  ],

  pages: {
    signIn: '/auth/signin',
  },

  events: {
    async signOut({ token }) {
      if (token && typeof token.userId === 'string') {
        const userId = parseInt(token.userId, 10);
        if (!isNaN(userId)) {
          await removeRememberMeToken(userId);
        }
      }
    },
    async signIn({ user }) {
      const extendedUser = user as ExtendedUser;
      if (extendedUser.id) {
        const userId = parseInt(extendedUser.id, 10);
        if (!isNaN(userId)) {
          const rememberMeToken = await setRememberMeToken(userId);
          extendedUser.rememberMeToken = rememberMeToken;
        }
      }
    },
  },

  callbacks: {
    async jwt({ token, user }): Promise<ExtendedJWT> {
      if (user) {
        token.userId = user.id;
      }
      return token as ExtendedJWT;
    },
    async session({ session, token }) {
      const extendedToken = token as ExtendedJWT;
      if (extendedToken.userId) {
        session.user.id = extendedToken.userId;
      }
      return session;
    },
  },
};
