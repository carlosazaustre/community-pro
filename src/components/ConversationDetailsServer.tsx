import { GetConversationDetailsUseCase } from '@/application/use-cases/GetConversationDetailsUseCase';
import { VercelPostgresConversationRepository } from '@/infrastructure/database/VercelPostgresConversationRepository';
import ConversationDetailsClient from '@/components/ConversationDetailsClient';

interface ConversationDetailsServerProps {
  conversationId: number;
}

export default async function ConversationDetailsServer({
  conversationId,
}: ConversationDetailsServerProps) {
  const repository = new VercelPostgresConversationRepository();
  const useCase = new GetConversationDetailsUseCase(repository);
  const conversationDetails = await useCase.execute(conversationId);

  return (
    <ConversationDetailsClient conversationDetails={conversationDetails} />
  );
}
