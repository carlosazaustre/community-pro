import { Conversation } from '../entities/Conversation';
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
  getCommentCountForConversation(conversationId: number): Promise<number>;
}
