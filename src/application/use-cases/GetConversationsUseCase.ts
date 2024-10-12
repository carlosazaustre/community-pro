import { ConversationDTO } from '../dtos/ConversationDTO';
import { ConversationRepository } from '@/domain/interfaces/ConversationRepository';

export class GetConversationsUseCase {
  constructor(private conversationRepository: ConversationRepository) {}

  async execute(
    page: number = 1,
    limit: number = 20,
    topicId?: number
  ): Promise<{ conversations: ConversationDTO[]; totalPages: number }> {
    const { conversations, totalItems } =
      await this.conversationRepository.getConversations(page, limit, topicId);
    const totalPages = Math.ceil(totalItems / limit);
    return { conversations, totalPages };
  }
}
