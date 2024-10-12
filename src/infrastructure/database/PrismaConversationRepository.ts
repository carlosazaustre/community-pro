import { PrismaClient } from '@prisma/client';
import { ConversationRepository } from '@/domain/interfaces/ConversationRepository';
import { Conversation } from '@/domain/entities/Conversation';
import { ConversationMapper } from '../mappers/ConversationMapper';

export class PrismaConversationRepository implements ConversationRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getConversations(
    page: number,
    limit: number,
    topicId?: number
  ): Promise<{ conversations: Conversation[]; totalItems: number }> {
    const where = topicId ? { topicId } : {};
    const skip = (page - 1) * limit;

    const [conversations, totalItems] = await Promise.all([
      this.prisma.conversation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          user: true,
          topic: true,
          _count: {
            select: { comments: true },
          },
        },
      }),
      this.prisma.conversation.count({ where }),
    ]);

    return {
      conversations: conversations.map(ConversationMapper.toDTO),
      totalItems,
    };
  }
}
