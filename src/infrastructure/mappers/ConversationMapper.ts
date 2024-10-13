import { Conversation } from '@/domain/entities/Conversation';
import { User } from '@/domain/entities/User';
import { Topic } from '@/domain/entities/Topic';
import { Comment } from '@/domain/entities/Comment';
import { ConversationDTO } from '@/application/dtos/ConversationDTO';
import {
  ConversationDetailsDTO,
  CommentDTO,
} from '@/application/dtos/ConversationDetailsDTO';

export class ConversationMapper {
  static toDTO(
    conversation: Conversation,
    user: User,
    topic: Topic | null,
    commentCount: number
  ): ConversationDTO {
    return {
      id: conversation.id,
      title: conversation.title,
      content: conversation.content,
      createdAt: conversation.createdAt.toISOString(),
      updatedAt: conversation.updatedAt.toISOString(),
      isPinned: conversation.isPinned,
      user: {
        id: user.id,
        username: user.username,
      },
      topic: topic
        ? {
            id: topic.id,
            name: topic.name,
          }
        : null,
      commentCount: commentCount,
    };
  }

  static toDetailsDTO(
    conversation: Conversation,
    user: User,
    topic: Topic | null,
    comments: Comment[]
  ): ConversationDetailsDTO {
    const commentCount = Array.isArray(comments) ? comments.length : 0;

    return {
      ...this.toDTO(conversation, user, topic, commentCount),
      comments: Array.isArray(comments) ? comments?.map(this.toCommentDTO) : [],
    };
  }

  private static toCommentDTO(comment: Comment): CommentDTO {
    return {
      id: comment.id,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
      user: {
        id: comment.user.id,
        username: comment.user.username,
      },
    };
  }
}
