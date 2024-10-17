import { useState, useCallback } from 'react';
import { CommentDTO } from '@/core/dtos/CommentDTO';

export function useComments(initialComments: CommentDTO[], conversationId: number) {
  console.info(
    `Initializing useComments for conversation ${conversationId} with ${initialComments.length} comments`
  );
  const [comments, setComments] = useState<CommentDTO[]>(initialComments);

  const addComment = useCallback(
    async (content: string): Promise<CommentDTO> => {
      console.info(`Attempting to add comment to conversation ${conversationId}`);
      try {
        const response = await fetch(`/api/conversations/${conversationId}/comments`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ content }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error(`Failed to add comment: ${errorData.error}`);
          throw new Error(errorData.error || 'Failed to add comment');
        }

        const newComment: CommentDTO = await response.json();
        console.info(`Comment added successfully, id: ${newComment.id}`);
        setComments((prevComments) => {
          const updatedComments = [...prevComments, newComment];
          console.debug(`Updated comments count: ${updatedComments.length}`);
          return updatedComments;
        });
        return newComment;
      } catch (error) {
        console.error('Error in addComment:', error);
        throw error;
      }
    },
    [conversationId]
  );

  return { comments, addComment };
}
