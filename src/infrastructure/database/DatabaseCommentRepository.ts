import { CommentRepository } from '@/core/interfaces/CommentRepository';
import { Comment } from '@/core/entities/Comment';
import { CommentMapper } from '@/infrastructure/mappers/CommentMapper';
import { CommentRow } from './types';
import { executeQuery } from './db';

export class DatabaseCommentRepository implements CommentRepository {
  /**
   * Adds a new comment to the database.
   *
   * @param userId - The ID of the user adding the comment.
   * @param conversationId - The ID of the conversation to which the comment belongs.
   * @param content - The content of the comment.
   * @returns A promise that resolves to the newly added comment.
   */
  async addComment(userId: number, conversationId: number, content: string): Promise<Comment> {
    const query = `
      WITH inserted_comment AS (
        INSERT INTO comments (user_id, conversation_id, content)
        VALUES ($1, $2, $3)
        RETURNING id, content, created_at, updated_at, user_id, conversation_id
      )
      SELECT ic.*, u.username as user_username
      FROM inserted_comment ic
      JOIN users u ON u.id = ic.user_id
    `;

    const result = await executeQuery<CommentRow>(query, [userId, conversationId, content]);

    if (result.length === 0) {
      throw new Error('Failed to add comment');
    }

    return CommentMapper.toDomain(result[0], conversationId);
  }

  /**
   * Retrieves the count of comments for a specific conversation.
   *
   * @param conversationId - The unique identifier of the conversation.
   * @returns A promise that resolves to the number of comments for the given conversation.
   */
  async getCommentCountForConversation(conversationId: number): Promise<number> {
    const query = `
      SELECT COUNT(*) as count
      FROM comments
      WHERE conversation_id = $1
    `;

    const result = await executeQuery<{ count: string }>(query, [conversationId]);
    return parseInt(result[0].count, 10);
  }

  /**
   * Retrieves comments for a specific conversation.
   *
   * @param conversationId - The ID of the conversation for which to retrieve comments.
   * @returns A promise that resolves to an array of comments.
   *
   * Each comment includes:
   * - `id`: The comment's ID.
   * - `content`: The content of the comment.
   * - `createdAt`: The date and time when the comment was created.
   * - `updatedAt`: The date and time when the comment was last updated.
   * - `userId`: The ID of the user who made the comment.
   * - `user`: An object containing the user's details:
   *   - `id`: The user's ID.
   *   - `username`: The user's username.
   */

  async getCommentsForConversation(conversationId: number): Promise<Comment[]> {
    const query = `
        SELECT c.id, c.content, c.created_at, c.updated_at, c.user_id,
               u.username as user_username
        FROM comments c
        LEFT JOIN users u ON c.user_id = u.id
        WHERE c.conversation_id = $1
        ORDER BY c.created_at ASC
      `;

    const rows = await executeQuery<CommentRow>(query, [conversationId]);
    return rows.map((row) => CommentMapper.toDomain(row, conversationId));
  }
}
