import { Conversation } from '@/core/entities/Conversation';
import { User } from '@/core/entities/User';
import { Topic } from '@/core/entities/Topic';

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
