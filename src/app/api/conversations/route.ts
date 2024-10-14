// Route: /api/conversations

import { NextRequest, NextResponse } from 'next/server';
import { GetConversationsUseCase } from '@/application/use-cases/GetConversationsUseCase';
import { VercelPostgresConversationRepository } from '@/infrastructure/database/VercelPostgresConversationRepository';

/**
 * @openapi
 * /api/conversations:
 *   get:
 *     summary: Retrieve a list of conversations
 *     description: Fetches conversations with pagination and optional topic filtering.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: The number of conversations per page.
 *       - in: query
 *         name: topicId
 *         schema:
 *           type: integer
 *         description: The ID of the topic to filter conversations by.
 *     responses:
 *       200:
 *         description: A list of conversations and pagination details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 conversations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Conversation object.
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages.
 *                 currentPage:
 *                   type: integer
 *                   description: The current page number.
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error message.
 */

/**
 * Handles the GET request to fetch conversations.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to the response object containing conversations data or an error message.
 *
 * The function extracts query parameters from the request URL:
 * - `page`: The page number for pagination (default is 1).
 * - `limit`: The number of items per page (default is 10).
 * - `topicId`: The ID of the topic to filter conversations (optional).
 *
 * It then uses a repository and a use case to fetch the conversations and total pages.
 * If successful, it returns a JSON response with the conversations, total pages, and current page.
 * If an error occurs, it logs the error and returns a JSON response with an error message and a 500 status code.
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const topicId = searchParams.get('topicId')
    ? Number(searchParams.get('topicId'))
    : undefined;

  try {
    const repository = new VercelPostgresConversationRepository();
    const useCase = new GetConversationsUseCase(repository);
    const { conversations, totalPages } = await useCase.execute(
      page,
      limit,
      topicId
    );

    return NextResponse.json({ conversations, totalPages, currentPage: page });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
