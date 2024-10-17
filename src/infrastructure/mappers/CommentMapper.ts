import { Comment } from '@/core/entities/Comment';
import { CommentRow } from '@/infrastructure/database/types';
import { CommentDTO } from '@/core/dtos/CommentDTO';

export class CommentMapper {
  static toDTO(comment: Comment): CommentDTO {
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      updatedAt: comment.updatedAt?.toISOString() || null,
      userId: comment.userId,
      conversationId: comment.conversationId,
      user: {
        id: comment.userId,
        username: comment.username || 'Usuario Anónimo',
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain(row: CommentRow, conversationId: number): Comment {
    return {
      id: row.id,
      content: row.content,
      createdAt: new Date(row.created_at),
      updatedAt: row.updated_at ? new Date(row.updated_at) : null,
      userId: row.user_id,
      username: row.user_username,
      conversationId,
    };
  }
}
