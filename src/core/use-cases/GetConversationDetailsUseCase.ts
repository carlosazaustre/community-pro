import { ConversationRepository } from '@/core/interfaces/ConversationRepository';
import { ConversationMapper } from '@/infrastructure/mappers/ConversationMapper';
import { ConversationDetailsDTO } from '@/core/dtos/ConversationDetailsDTO';

/**
 * Use case for retrieving the details of a conversation.
 *
 * @class GetConversationDetailsUseCase
 * @constructor
 * @param {ConversationRepository} conversationRepository - The repository to access conversation data.
 */

/**
 * Executes the use case to get the details of a conversation.
 *
 * @method execute
 * @async
 * @param {number} conversationId - The ID of the conversation to retrieve details for.
 * @returns {Promise<ConversationDetailsDTO>} A promise that resolves to the details of the conversation.
 * @throws {Error} If the conversation is not found.
 * @throws {Error} If the user for the conversation is not found.
 */
export class GetConversationDetailsUseCase {
  constructor(private conversationRepository: ConversationRepository) {}

  async execute(conversationId: number): Promise<ConversationDetailsDTO> {
    let commentCount = 0;
    const [conversation, user, topic, comments] = await Promise.all([
      this.conversationRepository.getConversationDetails(conversationId),
      this.conversationRepository.getUserForConversation(conversationId),
      this.conversationRepository.getTopicForConversation(conversationId),
      this.conversationRepository.getCommentsForConversation(conversationId),
    ]);

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    if (!user) {
      throw new Error('User not found for conversation');
    }

    if (comments) {
      commentCount = comments.length;
    }

    return ConversationMapper.toDetailsDTO(conversation, user, topic, commentCount, comments || []);
  }
}
