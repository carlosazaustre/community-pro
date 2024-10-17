import { Conversation } from '@/core/domain/entities/Conversation';
import { User } from '@/core/domain/entities/User';
import { Topic } from '@/core/domain/entities/Topic';

export interface ConversationRepository {
  getConversations(
    page: number,
    limit: number,
    topicId?: number
  ): Promise<{ conversations: Conversation[]; totalItems: number }>;
  getConversationDetails(conversationId: number): Promise<Conversation>;
  getUserForConversation(conversationId: number): Promise<User>;
  getTopicForConversation(conversationId: number): Promise<Topic | null>;
}
