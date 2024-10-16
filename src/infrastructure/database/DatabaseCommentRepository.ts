import { CommentRepository } from '@/core/interfaces/CommentRepository';
import { Comment } from '@/core/entities/Comment';
import { CommentMapper } from '@/infrastructure/mappers/CommentMapper';
import { sql } from '@vercel/postgres';

export class DatabaseCommentRepository implements CommentRepository {
  async addComment(userId: number, conversationId: number, content: string): Promise<Comment> {
    const { rows } = await sql`
      INSERT INTO comments (user_id, conversation_id, content)
      VALUES (${userId}, ${conversationId}, ${content})
      RETURNING id, content, created_at, updated_at, user_id, conversation_id
    `;

    const { rows: userRows } = await sql`
      SELECT username FROM users WHERE id = ${userId}
    `;

    const commentData = {
      ...rows[0],
      user_username: userRows[0].username,
    };

    return CommentMapper.toDomain(commentData);
  }
}
