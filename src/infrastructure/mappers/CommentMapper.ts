import { Comment } from '@/core/entities/Comment';
import { CommentDTO } from '@/core/dtos/CommentDTO';

export class CommentMapper {
  static toDTO(comment: Comment): CommentDTO {
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      userId: comment.userId,
      conversationId: comment.conversationId,
      user: {
        id: comment.user.id!,
        username: comment.user.username || 'Usuario Anónimo',
      },
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain(row: any): Comment {
    return {
      id: row.id,
      content: row.content,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      userId: row.user_id,
      conversationId: row.conversation_id,
      user: {
        id: row.user_id,
        username: row.username || row.user_username || 'Usuario Anónimo',
        fullName: row.full_name || '',
        email: row.email || '',
        createdAt: row.user_created_at ? new Date(row.user_created_at) : new Date(),
      },
    };
  }
}
