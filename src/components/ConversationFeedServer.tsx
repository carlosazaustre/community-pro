import { GetConversationsUseCase } from '@/application/use-cases/GetConversationsUseCase';
import { VercelPostgresConversationRepository } from '@/infrastructure/database/VercelPostgresConversationRepository';
import ConversationFeedClient from '@/components/ConversationFeedClient';

interface ConversationFeedServerProps {
  page: number;
  limit: number;
  topicId?: number;
}

export default async function ConversationFeedServer({
  page,
  limit,
  topicId,
}: ConversationFeedServerProps) {
  const repository = new VercelPostgresConversationRepository();
  const useCase = new GetConversationsUseCase(repository);
  const { conversations, totalPages } = await useCase.execute(
    page,
    limit,
    topicId
  );

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
