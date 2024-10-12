// eslint-disable @typescript-eslint/no-unsafe-member-access
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  // @ts-expect-error: Unreachable code error
  if (!global.prisma) {
    // @ts-expect-error: Unreachable code error
    global.prisma = new PrismaClient();
  }
  // @ts-expect-error: Unreachable code error
  prisma = global.prisma;
}

export default prisma;
