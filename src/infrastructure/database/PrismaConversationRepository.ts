import { PrismaClient } from '@prisma/client';
import { ConversationRepository } from '@/domain/interfaces/ConversationRepository';
import { Conversation } from '@/domain/entities/Conversation';
import { User } from '@/domain/entities/User';
import { Topic } from '@/domain/entities/Topic';
export class PrismaConversationRepository implements ConversationRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async getConversations(
    page: number,
    limit: number,
    topicId?: number
  ): Promise<{
    conversations: Conversation[];
    totalItems: number;
  }> {
    const where = topicId ? { topicId } : {};
    const skip = (page - 1) * limit;

    const [conversations, totalItems] = await Promise.all([
      this.prisma.conversation.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          content: true,
          createdAt: true,
          updatedAt: true,
          isPinned: true,
          userId: true,
          topicId: true,
        },
      }),
      this.prisma.conversation.count({ where }),
    ]);

    return {
      conversations,
      totalItems,
    };
  }

  async getConversationDetails(conversationId: number): Promise<Conversation> {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        updatedAt: true,
        isPinned: true,
        userId: true,
        topicId: true,
      },
    });

    if (!conversation) {
      throw new Error('Conversation not found');
    }

    return conversation;
  }

  async getUserForConversation(conversationId: number): Promise<User> {
    const user = await this.prisma.conversation
      .findUnique({
        where: { id: conversationId },
        select: {
          user: {
            select: {
              id: true,
              username: true,
            },
          },
        },
      })
      .then((result) => result?.user);

    if (!user) {
      throw new Error('User not found for conversation');
    }

    return user;
  }

  async getTopicForConversation(conversationId: number): Promise<Topic | null> {
    const topic = await this.prisma.conversation
      .findUnique({
        where: { id: conversationId },
        select: {
          topic: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })
      .then((result) => result?.topic || null);

    return topic;
  }

  async getCommentCountForConversation(
    conversationId: number
  ): Promise<number> {
    const count = await this.prisma.comment.count({
      where: { conversationId },
    });

    return count;
  }
}
