import { DatabaseConversationRepository } from '@/infrastructure/database/DatabaseConversationRepository';
import { DatabaseCommentRepository } from '@/infrastructure/database/DatabaseCommentRepository';
import { ConversationDTO } from '@/core/dtos/ConversationDTO';
import { ConversationDetailsDTO } from '@/core/dtos/ConversationDetailsDTO';
import { GetConversationsUseCase } from '@/core/use-cases/GetConversationsUseCase';
import { GetConversationDetailsUseCase } from '@/core/use-cases/GetConversationDetailsUseCase';

const conversationRepository = new DatabaseConversationRepository();
const commentRepository = new DatabaseCommentRepository();
const getConversationsUseCase = new GetConversationsUseCase(
  conversationRepository,
  commentRepository
);
const getConversationDetailsUseCase = new GetConversationDetailsUseCase(
  conversationRepository,
  commentRepository
);

/**
 * Retrieves a paginated list of conversations based on the provided parameters.
 *
 * @param {Object} params - The parameters for retrieving conversations.
 * @param {number} params.page - The page number to retrieve.
 * @param {number} params.limit - The number of conversations per page.
 * @param {number} [params.topicId] - Optional topic ID to filter conversations.
 * @returns {Promise<{ conversations: ConversationDTO[]; totalPages: number }>}
 * A promise that resolves to an object containing the list of conversations and the total number of pages.
 */
export async function getConversations({
  page,
  limit,
  topicId,
}: {
  page: number;
  limit: number;
  topicId?: number;
}): Promise<{
  conversations: ConversationDTO[];
  totalPages: number;
}> {
  return getConversationsUseCase.execute(page, limit, topicId);
}

/**
 * Retrieves the details of a conversation based on the provided conversation ID.
 *
 * @param {Object} params - The parameters for retrieving conversation details.
 * @param {number} params.conversationId - The ID of the conversation to retrieve details for.
 * @returns {Promise<ConversationDetailsDTO>} A promise that resolves to the details of the conversation.
 */
export async function getConversationDetails({
  conversationId,
}: {
  conversationId: number;
}): Promise<ConversationDetailsDTO> {
  console.info(`Getting conversation details for conversation ${conversationId}`);

  try {
    const result = await getConversationDetailsUseCase.execute(conversationId);
    console.info(
      `Retrieved conversation details for ${conversationId}, found ${result.comments.length} comments`
    );
    return result;
  } catch (error) {
    console.error(`Error getting conversation details for ${conversationId}:`, error);
    throw error;
  }
}
