import { ConversationDTO } from '../dtos/ConversationDTO';
import {
  ConversationRepository,
  ConversationWithDetails,
} from '@/domain/interfaces/ConversationRepository';

export class GetConversationsUseCase {
  constructor(private conversationRepository: ConversationRepository) {}

  private mapToDTO(conversation: ConversationWithDetails): ConversationDTO {
    return {
      id: conversation.id,
      title: conversation.title,
      content: conversation.content,
      createdAt: conversation.createdAt.toISOString(),
      updatedAt: conversation.updatedAt.toISOString(),
      isPinned: conversation.isPinned,
      user: {
        id: conversation.user.id,
        username: conversation.user.username,
      },
      topic: conversation.topic
        ? {
            id: conversation.topic.id,
            name: conversation.topic.name,
          }
        : null,
      commentCount: conversation._count.comments,
    };
  }

  async execute(
    page: number = 1,
    limit: number = 20,
    topicId?: number
  ): Promise<{ conversations: ConversationDTO[]; totalPages: number }> {
    const { conversations, totalItems } =
      await this.conversationRepository.getConversations(page, limit, topicId);

    const totalPages = Math.ceil(totalItems / limit);
    const conversationsDTOs = conversations.map(this.mapToDTO);

    return { conversations: conversationsDTOs, totalPages };
  }
}
