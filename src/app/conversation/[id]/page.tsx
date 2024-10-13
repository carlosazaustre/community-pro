// Page: /conversation/:id
import ConversationDetailsServer from '@/components/ConversationDetailsServer';

interface ConversationDetailPageProps {
  params: { id: string };
}

export default async function ConversationDetailPage({
  params,
}: ConversationDetailPageProps) {
  const conversationId = parseInt(params.id, 10);

  return <ConversationDetailsServer conversationId={conversationId} />;
}
