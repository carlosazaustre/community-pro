import { useState, useEffect, useCallback } from 'react';
import { CommentDTO } from '@/core/dtos/CommentDTO';

/**
 * Custom hook to manage comments for a specific conversation.
 *
 * @param {CommentDTO[]} initialComments - Initial list of comments.
 * @param {number} conversationId - ID of the conversation.
 * @returns {Object} - An object containing the current list of comments and a function to add a new comment.
 * @returns {CommentDTO[]} comments - The current list of comments.
 * @returns {Function} addComment - Function to add a new comment.
 * @returns {Promise<CommentDTO>} addComment.content - The content of the new comment.
 *
 * @example
 * const { comments, addComment } = useComments(initialComments, conversationId);
 *
 * // Adding a new comment
 * addComment('This is a new comment').then(newComment => {
 *   console.log('Comment added:', newComment);
 * }).catch(error => {
 *   console.error('Error adding comment:', error);
 * });
 *
 * @throws {Error} Throws an error if adding a comment fails.
 */

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

  useEffect(() => {
    const eventSource = new EventSource(`/api/sse?conversationId=${conversationId}`);

    eventSource.onmessage = (event) => {
      if (event.data !== 'ping') {
        const newComment = JSON.parse(event.data);
        setComments((prevComments) => {
          const commentExists = prevComments.some((comment) => comment.id === newComment.id);
          if (commentExists) {
            return prevComments;
          }
          return [...prevComments, newComment];
        });
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE error:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [conversationId]);

  return { comments, addComment };
}
