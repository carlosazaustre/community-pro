// app/api/auth/[...nextauth]/route.ts
import NextAuth from 'next-auth';
import type { NextAuthOptions, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import type { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { VercelPostgresUserRepository } from '@/infrastructure/database/VercelPostgresUserRepository';
import { AuthenticateUserUseCase } from '@/application/use-cases/AuthenticateUserUseCase';

const userRepository = new VercelPostgresUserRepository();
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const user = await authenticateUserUseCase.execute(credentials.username, credentials.password);

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

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
