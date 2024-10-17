import { Comment } from '@/core/domain/entities/Comment';

export interface CommentRepository {
  addComment(userId: number, conversationId: number, content: string): Promise<Comment>;
  getCommentsForConversation(conversationId: number): Promise<Comment[]>;
  getCommentCountForConversation(conversationId: number): Promise<number>;
}
