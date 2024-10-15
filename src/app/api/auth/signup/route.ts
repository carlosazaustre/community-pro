// Route: /api/auth/signup/

import { NextResponse } from 'next/server';
import { registerUser } from '@/auth/services/AuthService';

/**
 * @openapi
 * /api/auth/signup:
 *   post:
 *     summary: Register a new user
 *     description: This endpoint allows for the registration of a new user by providing their full name, username, email, and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: The full name of the user
 *               username:
 *                 type: string
 *                 description: The username of the user
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the user account
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 userId:
 *                   type: string
 *                   description: The ID of the newly registered user
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Error message describing what went wrong
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: An unexpected error occurred
 */

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, username, email, password } = body;

    const user = await registerUser({
      fullName,
      username,
      email,
      password,
    });

    return NextResponse.json({ message: 'User registered successfully', userId: user.id }, { status: 201 });
  } catch (error) {
    console.error('Error in signup:', error);
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred' }, { status: 500 });
  }
}
