import { Conversation } from '@/domain/entities/Conversation';
import { User } from '@/domain/entities/User';
import { Topic } from '@/domain/entities/Topic';
import { ConversationDTO } from '@/application/dtos/ConversationDTO';

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
}
