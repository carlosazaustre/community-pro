// Page: /conversation/:id

import { getConversationDetails } from '@/features/conversations/services/ConversationService';
import ConversationDetails from '@/features/conversations/components/ConversationDetails';

interface ConversationDetailPageProps {
  params: { id: string };
}

export default async function ConversationDetailPage({ params }: ConversationDetailPageProps) {
  const conversationId = parseInt(params.id, 10);
  const conversationDetails = await getConversationDetails({ conversationId });

  return <ConversationDetails conversationDetails={conversationDetails} />;
}
