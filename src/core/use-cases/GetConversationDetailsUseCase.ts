import { ConversationRepository } from '@/core/interfaces/ConversationRepository';
import { CommentRepository } from '@/core/interfaces/CommentRepository';
import { ConversationMapper } from '@/infrastructure/mappers/ConversationMapper';
import { ConversationDetailsDTO } from '@/core/dtos/ConversationDetailsDTO';

/**
 * Use case for retrieving the details of a conversation.
 *
 * @class GetConversationDetailsUseCase
 * @constructor
 * @param {ConversationRepository} conversationRepository - The repository to access conversation data.
 *
 * @method execute
 * @async
 * @param {number} conversationId - The ID of the conversation to retrieve details for.
 * @returns {Promise<ConversationDetailsDTO>} A promise that resolves to the details of the conversation.
 * @throws {Error} If the conversation is not found.
 * @throws {Error} If the user for the conversation is not found.
 */
export class GetConversationDetailsUseCase {
  constructor(
    private conversationRepository: ConversationRepository,
    private commentRepository: CommentRepository
  ) {}

  async execute(conversationId: number): Promise<ConversationDetailsDTO> {
    console.info(`Fetching details for conversation ${conversationId}`);
    let commentCount = 0;
    const [conversation, user, topic, comments] = await Promise.all([
      this.conversationRepository.getConversationDetails(conversationId),
      this.conversationRepository.getUserForConversation(conversationId),
      this.conversationRepository.getTopicForConversation(conversationId),
      this.commentRepository.getCommentsForConversation(conversationId),
    ]);

    if (!conversation) {
      console.error(`Conversation not found for id: ${conversationId}`);
      throw new Error('Conversation not found');
    }

    if (!user) {
      console.error(`User not found for conversation: ${conversationId}`);
      throw new Error('User not found for conversation');
    }

    if (comments) {
      commentCount = comments.length;
      console.info(`Found ${commentCount} comments for conversation ${conversationId}`);
    } else {
      console.warn(`No comments found for conversation ${conversationId}`);
    }

    const result = ConversationMapper.toDetailsDTO(
      conversation,
      user,
      topic,
      commentCount,
      comments || []
    );
    console.info(`Conversation details mapped, returning ${result.comments.length} comments`);
    return result;
  }
}
