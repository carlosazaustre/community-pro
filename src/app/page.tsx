// Page: /

import { getConversations } from '@/features/conversations/services/ConversationService';
import ConversationFeed from '@/features/conversations/components/ConversationFeed';

interface HomeProps {
  searchParams: { page?: string; topicId?: string };
}

export default async function Home({ searchParams }: HomeProps) {
  const page = Number(searchParams.page) || 1;
  const limit = 10;
  const topicId = searchParams.topicId ? Number(searchParams.topicId) : undefined;

  const { conversations, totalPages } = await getConversations({ page, limit, topicId });

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <main className="lg:w-2/3">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Community Feed</h1>
        <ConversationFeed
          initialConversations={conversations}
          initialPage={page}
          totalPages={totalPages}
          limit={limit}
          topicId={topicId}
        />
      </main>
      <aside className="lg:w-1/3">Members Ranking</aside>
    </div>
  );
}
