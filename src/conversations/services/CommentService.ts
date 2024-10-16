import { AddCommentUseCase } from '@/core/use-cases/AddCommentUseCase';
import { DatabaseCommentRepository } from '@/infrastructure/database/DatabaseCommentRepository';
import { DatabaseUserRepository } from '@/infrastructure/database/DatabaseUserRepository';
import { CommentDTO } from '@/core/dtos/CommentDTO';

const commentRepository = new DatabaseCommentRepository();
const userRepository = new DatabaseUserRepository();
const addCommentUseCase = new AddCommentUseCase(commentRepository, userRepository);

/**
 * Adds a comment to a conversation.
 *
 * @param {CommentProps} params - The parameters for adding a comment.
 * @param {string} params.userId - The ID of the user adding the comment.
 * @param {string} params.conversationId - The ID of the conversation to which the comment is being added.
 * @param {string} params.content - The content of the comment.
 * @returns {Promise<CommentDTO>} A promise that resolves to the added comment data transfer object.
 */
interface CommentProps {
  userId: number;
  conversationId: number;
  content: string;
}

export async function addComment({ userId, conversationId, content }: CommentProps): Promise<CommentDTO> {
  return await addCommentUseCase.execute(userId, conversationId, content);
}
