import { GetConversationsUseCase } from '@/core/use-cases/GetConversationsUseCase';
import { DatabaseConversationRepository } from '@/infrastructure/database/DatabaseConversationRepository';
import ConversationFeedClient from '@/conversations/components/ConversationFeedClient';

interface ConversationFeedServerProps {
  page: number;
  limit: number;
  topicId?: number;
}

export default async function ConversationFeedServer({ page, limit, topicId }: ConversationFeedServerProps) {
  const repository = new DatabaseConversationRepository();
  const useCase = new GetConversationsUseCase(repository);
  const { conversations, totalPages } = await useCase.execute(page, limit, topicId);

  return (
    <ConversationFeedClient
      initialConversations={conversations}
      initialPage={page}
      totalPages={totalPages}
      limit={limit}
      topicId={topicId}
    />
  );
}
