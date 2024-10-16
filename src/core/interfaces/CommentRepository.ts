import { Comment } from '@/core/entities/Comment';

export interface CommentRepository {
  addComment(userId: number, conversationId: number, content: string): Promise<Comment>;
}
