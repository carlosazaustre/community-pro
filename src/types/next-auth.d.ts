import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      username: string;
      email: string;
      image?: string;
    } & DefaultSession['user'];
  }

  interface User {
    id: string;
    username?: string;
    name?: string | null;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    username: string;
  }
}
