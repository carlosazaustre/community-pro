import { DatabaseConversationRepository } from '@/infrastructure/database/DatabaseConversationRepository';
import { ConversationDTO } from '@/core/dtos/ConversationDTO';
import { GetConversationsUseCase } from '@/core/use-cases/GetConversationsUseCase';

const repository = new DatabaseConversationRepository();
const getConversationsUseCase = new GetConversationsUseCase(repository);

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
