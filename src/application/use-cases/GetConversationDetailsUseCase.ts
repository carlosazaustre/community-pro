import { ConversationRepository } from '@/domain/interfaces/ConversationRepository';
import { ConversationMapper } from '@/infrastructure/mappers/ConversationMapper';
import { ConversationDetailsDTO } from '@/application/dtos/ConversationDetailsDTO';

export class GetConversationDetailsUseCase {
  constructor(private conversationRepository: ConversationRepository) {}

  async execute(conversationId: number): Promise<ConversationDetailsDTO> {
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

    return ConversationMapper.toDetailsDTO(
      conversation,
      user,
      topic,
      comments || []
    );
  }
}
