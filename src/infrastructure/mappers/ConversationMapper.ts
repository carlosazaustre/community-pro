import { Conversation } from '@/domain/entities/Conversation';
import { User } from '@/domain/entities/User';
import { Topic } from '@/domain/entities/Topic';
import { ConversationDTO } from '@/application/dtos/ConversationDTO';

export class ConversationMapper {
  static toDTO(
    conversation: Conversation & {
      user: User;
      topic: Topic | null;
      _count?: { comments: number };
    }
  ): ConversationDTO {
    return {
      id: conversation.id,
      title: conversation.title,
      content: conversation.content,
      createdAt: conversation.createdAt.toISOString(),
      updatedAt: conversation.updatedAt.toISOString(),
      isPinned: conversation.isPinned,
      user: {
        id: conversation.user.id,
        username: conversation.user.username,
      },
      topic: conversation.topic
        ? {
            id: conversation.topic.id,
            name: conversation.topic.name,
          }
        : null,
      commentCount: conversation._count?.comments ?? 0,
    };
  }
}
