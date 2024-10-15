// Route: /api/verify-email

import { NextResponse } from 'next/server';
import { VerifyEmailUseCase } from '@/core/use-cases/VerifyEmailUseCase';
import { DatabaseUserRepository } from '@/infrastructure/database/DatabaseUserRepository';

/**
 * @openapi
 * /api/verify-email:
 *   post:
 *     summary: Verify user's email address
 *     description: This endpoint verifies a user's email address using a provided token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 description: The token used to verify the email address.
 *                 example: "exampleToken123"
 *     responses:
 *       200:
 *         description: Email verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Email verified successfully"
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is required"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "An unexpected error occurred"
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { token } = body;

    if (!token) {
      return NextResponse.json({ message: 'Token is required' }, { status: 400 });
    }

    const userRepository = new DatabaseUserRepository();
    const verifyEmailUseCase = new VerifyEmailUseCase(userRepository);

    await verifyEmailUseCase.execute(token);

    return NextResponse.json({ message: 'Email verified successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error verifying email:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
