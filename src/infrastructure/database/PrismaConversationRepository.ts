import {
  PrismaClient,
  Conversation as PrismaConversation,
  User as PrismaUser,
  Topic as PrismaTopic,
} from '@prisma/client';
import {
  ConversationRepository,
  ConversationWithDetails,
} from '@/domain/interfaces/ConversationRepository';

type PrismaConversationWithDetails = PrismaConversation & {
  user: PrismaUser;
  topic: PrismaTopic | null;
  _count: { comments: number };
};

export class PrismaConversationRepository implements ConversationRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  private mapToConversationWithDetails(
    prismaConversation: PrismaConversationWithDetails
  ): ConversationWithDetails {
    return {
      id: prismaConversation.id,
      title: prismaConversation.title,
      content: prismaConversation.content,
      createdAt: prismaConversation.createdAt,
      updatedAt: prismaConversation.updatedAt,
      isPinned: prismaConversation.isPinned,
      userId: prismaConversation.userId,
      topicId: prismaConversation.topicId,
      user: {
        id: prismaConversation.user.id,
        username: prismaConversation.user.username,
      },
      topic: prismaConversation.topic
        ? {
            id: prismaConversation.topic.id,
            name: prismaConversation.topic.name,
          }
        : null,
      _count: {
        comments: prismaConversation._count.comments,
      },
    };
  }

  async getConversations(
    page: number,
    limit: number,
    topicId?: number
  ): Promise<{ conversations: ConversationWithDetails[]; totalItems: number }> {
    const where = topicId ? { topicId } : {};
    const skip = (page - 1) * limit;

    const [prismaConversations, totalItems] = await Promise.all([
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

    const conversations = prismaConversations.map(
      this.mapToConversationWithDetails
    );

    return {
      conversations,
      totalItems,
    };
  }
}
