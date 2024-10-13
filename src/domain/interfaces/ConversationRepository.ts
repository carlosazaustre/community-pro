import { Conversation, User, Topic } from '../entities/Conversation';

export interface ConversationWithDetails extends Conversation {
  user: User;
  topic: Topic | null;
  _count: { comments: number };
}
export interface ConversationRepository {
  getConversations(
    page: number,
    limit: number,
    topicId?: number
  ): Promise<{ conversations: ConversationWithDetails[]; totalItems: number }>;
}
