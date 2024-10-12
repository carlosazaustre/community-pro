'use client';

import { useState } from 'react';
import { ConversationDTO } from '@/application/dtos/ConversationDTO';
import Pagination from '@/components/Pagination';
import ConversationCard from '@/components/ConversationCard';

interface ConversationFeedClientProps {
  initialConversations: ConversationDTO[];
  initialPage: number;
  totalPages: number;
  limit: number;
  topicId?: number;
}

export default function ConversationFeedClient({
  initialConversations,
  initialPage,
  totalPages,
  limit,
  topicId,
}: ConversationFeedClientProps) {
  const [conversations] = useState(initialConversations);
  const [page, setPage] = useState(initialPage);

  const handlePageChange = async (newPage: number) => {
    // TODO: API call to get new data
    // Implementar la llamada a la API para obtener nuevos datos
    console.log(
      `Fetching page ${newPage} with limit ${limit} and topicId ${topicId}`
    );

    // TODO: Replace this with a real API call to fetch new data
    // from the server
    setPage(newPage);
  };

  return (
    <div>
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <ConversationCard key={conversation.id} conversation={conversation} />
        ))}
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
