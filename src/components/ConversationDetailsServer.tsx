import { GetConversationDetailsUseCase } from '@/application/use-cases/GetConversationDetailsUseCase';
import { PrismaConversationRepository } from '@/infrastructure/database/PrismaConversationRepository';
import ConversationDetailsClient from '@/components/ConversationDetailsClient';

interface ConversationDetailsServerProps {
  conversationId: number;
}

export default async function ConversationDetailsServer({
  conversationId,
}: ConversationDetailsServerProps) {
  const repository = new PrismaConversationRepository();
  const useCase = new GetConversationDetailsUseCase(repository);
  const conversationDetails = await useCase.execute(conversationId);

  return (
    <ConversationDetailsClient conversationDetails={conversationDetails} />
  );
}
