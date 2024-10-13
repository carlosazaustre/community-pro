'use client';

import { useState } from 'react';
import {
  ConversationDetailsDTO,
  CommentDTO,
} from '@/application/dtos/ConversationDetailsDTO';

interface ConversationDetailsClientProps {
  conversationDetails: ConversationDetailsDTO;
}

export default function ConversationDetailsClient({
  conversationDetails,
}: ConversationDetailsClientProps) {
  const [comments] = useState<CommentDTO[]>(conversationDetails.comments);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{conversationDetails.title}</h1>
      <p>{conversationDetails.content}</p>
      <p>Por {conversationDetails.user.username}</p>
      <p>Topic: {conversationDetails.topic?.name || 'Uncategorized'}</p>
      <h2 className="text-xl font-semibold">Comments</h2>
      {comments.map((comment) => (
        <div key={comment.id} className="border p-2 rounded">
          <p>{comment.content}</p>
          <p className="text-sm text-gray-500">
            Por {comment.user.username} el{' '}
            {new Date(comment.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
      {/* TODO: Form to add new comments */}
    </div>
  );
}
