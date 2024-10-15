'use client';

import { useState } from 'react';
import { ConversationDTO } from '@/core/dtos/ConversationDTO';
import Pagination from '@/shared/components/Pagination';
import ConversationCard from './ConversationCard';

interface ConversationFeedProps {
  initialConversations: ConversationDTO[];
  initialPage: number;
  totalPages: number;
  limit: number;
  topicId?: number;
}

export default function ConversationFeed({
  initialConversations,
  initialPage,
  totalPages: initialTotalPages,
  limit,
  topicId,
}: ConversationFeedProps) {
  const [conversations, setConversations] = useState(initialConversations);
  const [page, setPage] = useState(initialPage);
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [isLoading, setIsLoading] = useState(false);

  const handlePageChange = async (newPage: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/conversations?page=${newPage}&limit=${limit}${topicId ? `&topicId=${topicId}` : ''}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch conversations');
      }
      const data = await response.json();
      setConversations(data.conversations);
      setPage(data.currentPage);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (!isLoading && conversations.length === 0) return <p>No conversations found.</p>;

  return (
    <div>
      <div className="space-y-4">
        {conversations.map((conversation) => (
          <ConversationCard key={conversation.id} conversation={conversation} />
        ))}
      </div>
      <Pagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
