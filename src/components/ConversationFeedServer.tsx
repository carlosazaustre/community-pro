import { GetConversationsUseCase } from '@/application/use-cases/GetConversationsUseCase';
import { PrismaConversationRepository } from '@/infrastructure/database/PrismaConversationRepository';
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
  const repository = new PrismaConversationRepository();
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
