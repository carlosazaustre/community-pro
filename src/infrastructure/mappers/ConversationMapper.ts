import { User } from '@/domain/entities/User';
import { Topic } from '@/domain/entities/Topic';
import { Comment } from '@/domain/entities/Comment';
import { Conversation } from '@/domain/entities/Conversation';
import { ConversationDTO } from '@/application/dtos/ConversationDTO';
import { ConversationDetailsDTO } from '@/application/dtos/ConversationDetailsDTO';

export class ConversationMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain(row: any): Conversation {
    return {
      id: row.id,
      title: row.title,
      content: row.content,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      isPinned: row.is_pinned,
      userId: row.user_id,
      topicId: row.topic_id,
    };
  }

  private static _toBaseDTO(
    conversation: Conversation,
    user: User,
    topic: Topic | null,
    commentCount: number
  ): Omit<ConversationDTO, 'comments'> {
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
        fullName: user.fullName,
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

  static toDTO(conversation: Conversation, user: User, topic: Topic | null, commentCount: number): ConversationDTO {
    return this._toBaseDTO(conversation, user, topic, commentCount);
  }

  static toDetailsDTO(
    conversation: Conversation,
    user: User,
    topic: Topic | null,
    commentCount: number,
    comments: Comment[]
  ): ConversationDetailsDTO {
    return {
      ...this._toBaseDTO(conversation, user, topic, commentCount),
      comments: comments.map((comment) => ({
        id: comment.id,
        content: comment.content,
        createdAt: comment.createdAt.toISOString(),
        updatedAt: comment.updatedAt.toISOString(),
        user: {
          id: comment.user.id,
          username: comment.user.username,
        },
      })),
    };
  }
}
