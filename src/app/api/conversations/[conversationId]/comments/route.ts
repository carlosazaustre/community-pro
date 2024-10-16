import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/options';
import { addComment } from '@/features/conversations/services/CommentService';

/**
 * @openapi
 * /api/conversations/{conversationId}/comments:
 *   post:
 *     summary: Add a comment to a conversation
 *     description: Adds a new comment to the specified conversation.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: conversationId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the conversation to which the comment will be added
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               content:
 *                 type: string
 *                 description: The content of the comment
 *             required:
 *               - content
 *     responses:
 *       200:
 *         description: Comment added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 userId:
 *                   type: string
 *                 conversationId:
 *                   type: string
 *                 content:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         description: Content is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *       500:
 *         description: An error occurred while adding the comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { conversationId: string } }
) {
  console.info(`Received POST request for conversation ${params.conversationId}`);
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !session.user.id) {
    console.warn('Unauthorized attempt to add comment');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { content } = await request.json();

  if (!content) {
    console.warn('Attempt to add comment with empty content');
    return NextResponse.json({ error: 'Content is required' }, { status: 400 });
  }

  try {
    console.info(
      `Adding comment for user ${session.user.id} to conversation ${params.conversationId}`
    );
    const comment = await addComment({
      userId: parseInt(session.user.id, 10),
      conversationId: parseInt(params.conversationId, 10),
      content,
    });

    console.info(`Comment added successfully, id: ${comment.id}`);

    return NextResponse.json(comment);
  } catch (error) {
    console.error('Error adding comment:', error);
    return NextResponse.json(
      { error: 'An error occurred while adding the comment' },
      { status: 500 }
    );
  }
}
