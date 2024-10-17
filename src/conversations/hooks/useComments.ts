import { useState, useCallback } from 'react';
import { CommentDTO } from '@/core/dtos/CommentDTO';

export function useComments(initialComments: CommentDTO[], conversationId: number) {
  const [comments, setComments] = useState<CommentDTO[]>(initialComments);

  const addComment = useCallback(
    async (content: string): Promise<CommentDTO> => {
      const response = await fetch(`/api/conversations/${conversationId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add comment');
      }

      const newComment: CommentDTO = await response.json();
      setComments((prevComments) => [...prevComments, newComment]);
      return newComment;
    },
    [conversationId]
  );

  return { comments, addComment };
}
