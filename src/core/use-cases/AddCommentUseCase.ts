import { CommentRepository } from '@/core/interfaces/CommentRepository';
import { UserRepository } from '@/core/interfaces/UserRepository';
import { CommentDTO } from '@/core/dtos/CommentDTO';
import { CommentMapper } from '@/infrastructure/mappers/CommentMapper';

/**
 * Use case for adding a comment to a conversation.
 *
 * @class AddCommentUseCase
 * @constructor
 * @param {CommentRepository} commentRepository - Repository for managing comments.
 * @param {UserRepository} userRepository - Repository for managing users.
 *
 * @method execute
 * @async
 * @param {number} userId - The ID of the user adding the comment.
 * @param {number} conversationId - The ID of the conversation to which the comment is being added.
 * @param {string} content - The content of the comment.
 * @returns {Promise<CommentDTO>} The added comment data transfer object.
 * @throws {Error} If the user is not found or the user's email is not verified.
 */
export class AddCommentUseCase {
  constructor(
    private commentRepository: CommentRepository,
    private userRepository: UserRepository
  ) {}

  async execute(userId: number, conversationId: number, content: string): Promise<CommentDTO> {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.emailVerified) {
      throw new Error('Email not verified');
    }

    const comment = await this.commentRepository.addComment(userId, conversationId, content);

    return CommentMapper.toDTO(comment, user);
  }
}
