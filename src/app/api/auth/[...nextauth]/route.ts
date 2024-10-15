import NextAuth from 'next-auth';
import { authOptions } from './options';

const handler = NextAuth(authOptions);

/**
 * @openapi
 * /api/auth/[...nextauth]:
 *   get:
 *     summary: Handle GET requests for authentication
 *     responses:
 *       200:
 *         description: Successful response
 *   post:
 *     summary: Handle POST requests for authentication
 *     responses:
 *       200:
 *         description: Successful response
 */
export { handler as GET, handler as POST };
