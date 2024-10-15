import { ConversationDTO } from '@/core/dtos/ConversationDTO';
import { ConversationRepository } from '@/core/interfaces/ConversationRepository';
import { ConversationMapper } from '@/infrastructure/mappers/ConversationMapper';

/**
 * Use case for retrieving conversations.
 *
 * @class GetConversationsUseCase
 * @constructor
 * @param {ConversationRepository} conversationRepository - The repository for accessing conversation data.
 *
 * @method execute
 * @async
 * @param {number} [page=1] - The page number for pagination.
 * @param {number} [limit=20] - The number of items per page.
 * @param {number} [topicId] - The ID of the topic to filter conversations.
 * @returns {Promise<{ conversations: ConversationDTO[]; totalPages: number }>} - An object containing the list of conversations and the total number of pages.
 */
export class GetConversationsUseCase {
  constructor(private conversationRepository: ConversationRepository) {}
  async execute(
    page: number = 1,
    limit: number = 20,
    topicId?: number
  ): Promise<{ conversations: ConversationDTO[]; totalPages: number }> {
    const { conversations, totalItems } = await this.conversationRepository.getConversations(page, limit, topicId);

    const conversationsWithDetails = await Promise.all(
      conversations.map(async (conversation) => {
        const user = await this.conversationRepository.getUserForConversation(conversation.id);
        const topic = await this.conversationRepository.getTopicForConversation(conversation.id);
        const commentCount = await this.conversationRepository.getCommentCountForConversation(conversation.id);

        return ConversationMapper.toDTO(conversation, user, topic, commentCount);
      })
    );

    const totalPages = Math.ceil(totalItems / limit);
    return { conversations: conversationsWithDetails, totalPages };
  }
}
