import { NextRequest, NextResponse } from 'next/server';
import { getConversations } from '@/features/conversations/services/ConversationService';

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

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = Number(searchParams.get('page')) || 1;
  const limit = Number(searchParams.get('limit')) || 10;
  const topicId = searchParams.get('topicId') ? Number(searchParams.get('topicId')) : undefined;

  try {
    const { conversations, totalPages } = await getConversations({ page, limit, topicId });

    return NextResponse.json({ conversations, totalPages, currentPage: page });
  } catch (error) {
    console.error('Error fetching conversations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
