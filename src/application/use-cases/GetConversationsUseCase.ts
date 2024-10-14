import { ConversationDTO } from '../dtos/ConversationDTO';
import { ConversationRepository } from '@/domain/interfaces/ConversationRepository';
import { ConversationMapper } from '@/infrastructure/mappers/ConversationMapper';

export class GetConversationsUseCase {
  constructor(private conversationRepository: ConversationRepository) {}

  /**
   * Executes the use case to retrieve conversations with additional details.
   *
   * @param {number} [page=1] - The page number to retrieve.
   * @param {number} [limit=20] - The number of conversations per page.
   * @param {number} [topicId] - The optional topic ID to filter conversations.
   * @returns {Promise<{ conversations: ConversationDTO[]; totalPages: number }>}
   *          A promise that resolves to an object containing the conversations
   *          and the total number of pages.
   */
  async execute(
    page: number = 1,
    limit: number = 20,
    topicId?: number
  ): Promise<{ conversations: ConversationDTO[]; totalPages: number }> {
    const { conversations, totalItems } =
      await this.conversationRepository.getConversations(page, limit, topicId);

    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conversation) => {
        const user = await this.conversationRepository.getUserForConversation(
          conversation.id
        );
        const topic = await this.conversationRepository.getTopicForConversation(
          conversation.id
        );
        const commentCount =
          await this.conversationRepository.getCommentCountForConversation(
            conversation.id
          );

        return ConversationMapper.toDTO(
          conversation,
          user,
          topic,
          commentCount
        );
      })
    );

    const totalPages = Math.ceil(totalItems / limit);
    return { conversations: conversationsWithDetails, totalPages };
  }
}
