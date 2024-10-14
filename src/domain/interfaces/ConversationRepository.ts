import { Conversation } from '../entities/Conversation';
import { Comment } from '../entities/Comment';
import { User } from '../entities/User';
import { Topic } from '../entities/Topic';

export interface ConversationRepository {
  getConversations(
    page: number,
    limit: number,
    topicId?: number
  ): Promise<{ conversations: Conversation[]; totalItems: number }>;
  getConversationDetails(conversationId: number): Promise<Conversation>;
  getUserForConversation(conversationId: number): Promise<User>;
  getTopicForConversation(conversationId: number): Promise<Topic | null>;
  getCommentsForConversation(conversationId: number): Promise<Comment[]>;
  getCommentCountForConversation(conversationId: number): Promise<number>;
}
