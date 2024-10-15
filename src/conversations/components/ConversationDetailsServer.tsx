import { GetConversationDetailsUseCase } from '@/core/use-cases/GetConversationDetailsUseCase';
import { DatabaseConversationRepository } from '@/infrastructure/database/DatabaseConversationRepository';
import ConversationDetailsClient from '@/conversations/components/ConversationDetailsClient';

interface ConversationDetailsServerProps {
  conversationId: number;
}

export default async function ConversationDetailsServer({ conversationId }: ConversationDetailsServerProps) {
  const repository = new DatabaseConversationRepository();
  const useCase = new GetConversationDetailsUseCase(repository);
  const conversationDetails = await useCase.execute(conversationId);

  return <ConversationDetailsClient conversationDetails={conversationDetails} />;
}
