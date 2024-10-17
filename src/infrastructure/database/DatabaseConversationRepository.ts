import { ConversationRepository } from '@/core/interfaces/ConversationRepository';
import { User } from '@/core/entities/User';
import { Conversation } from '@/core/entities/Conversation';
import { Topic } from '@/core/entities/Topic';
import { Comment } from '@/core/entities/Comment';
import { UserMapper } from '@/infrastructure/mappers/UserMapper';
import { ConversationMapper } from '@/infrastructure/mappers/ConversationMapper';
import { CommentMapper } from '@/infrastructure/mappers/CommentMapper';
import { sql } from '@vercel/postgres';

export class DatabaseConversationRepository implements ConversationRepository {
  /**
   * Retrieves a paginated list of conversations from the database.
   *
   * @param page - The page number to retrieve.
   * @param limit - The number of conversations to retrieve per page.
   * @param topicId - (Optional) The ID of the topic to filter conversations by.
   * @returns A promise that resolves to an object containing the list of conversations and the total number of items.
   *
   * @example
   * const result = await getConversations(1, 10, 5);
   * console.log(result.conversations); // Array of conversations
   * console.log(result.totalItems); // Total number of conversations
   */
  async getConversations(
    page: number,
    limit: number,
    topicId?: number
  ): Promise<{
    conversations: Conversation[];
    totalItems: number;
  }> {
    const offset = (page - 1) * limit;

    let baseQuery = `
      SELECT id, title, content, created_at, updated_at, is_pinned, user_id, topic_id 
      FROM conversations
    `;

    let countQuery = `SELECT COUNT(*) as count FROM conversations`;

    const conditions = [];
    const values = [];
    if (topicId !== undefined) {
      conditions.push(`topic_id = $${values.length + 1}`);
      values.push(topicId);
    }

    if (conditions.length > 0) {
      const whereClause = `WHERE ${conditions.join(' AND ')}`;
      baseQuery += ` ${whereClause}`;
      countQuery += ` ${whereClause}`;
    }

    baseQuery += ` ORDER BY created_at DESC LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    values.push(limit, offset);

    const [conversationsResult, countResult] = await Promise.all([
      sql.query(baseQuery, values),
      sql.query(countQuery, values.slice(0, -2)), // Exclude LIMIT and OFFSET for count query
    ]);

    const conversations = conversationsResult.rows.map(ConversationMapper.toDomain);

    const totalItems = parseInt(countResult.rows[0].count, 10);

    return { conversations, totalItems };
  }

  /**
   * Retrieves the details of a conversation by its ID.
   *
   * @param conversationId - The unique identifier of the conversation.
   * @returns A promise that resolves to a `Conversation` object containing the details of the conversation.
   * @throws An error if the conversation is not found.
   */
  async getConversationDetails(conversationId: number): Promise<Conversation> {
    const { rows } = await sql`
      SELECT id, title, content, created_at, updated_at, is_pinned, user_id, topic_id
      FROM conversations
      WHERE id = ${conversationId}
    `;

    if (rows.length === 0) {
      throw new Error('Conversation not found');
    }

    return ConversationMapper.toDomain(rows[0]);
  }

  /**
   * Retrieves the user associated with a given conversation.
   *
   * @param conversationId - The ID of the conversation to retrieve the user for.
   * @returns A promise that resolves to a User object containing all user details.
   * @throws An error if no user is found for the given conversation.
   */
  async getUserForConversation(conversationId: number): Promise<User> {
    const { rows } = await sql`
    SELECT u.id, u.full_name, u.username, u.email, u.password_hash, u.created_at, u.updated_at
    FROM users u
    JOIN conversations c ON u.id = c.user_id
    WHERE c.id = ${conversationId}
  `;

    if (rows.length === 0) {
      throw new Error('User not found for conversation');
    }

    return UserMapper.toDomain(rows[0]);
  }

  /**
   * Retrieves the topic associated with a given conversation.
   *
   * @param conversationId - The ID of the conversation for which to retrieve the topic.
   * @returns A promise that resolves to the topic associated with the conversation, or null if no topic is found.
   */
  async getTopicForConversation(conversationId: number): Promise<Topic | null> {
    const { rows } = await sql`
      SELECT t.id, t.name
      FROM topics t
      JOIN conversations c ON t.id = c.topic_id
      WHERE c.id = ${conversationId}
    `;

    if (rows.length === 0) {
      return null;
    }

    return {
      id: rows[0].id,
      name: rows[0].name,
    };
  }

  /**
   * Retrieves the count of comments for a specific conversation.
   *
   * @param conversationId - The unique identifier of the conversation.
   * @returns A promise that resolves to the number of comments for the given conversation.
   */
  async getCommentCountForConversation(conversationId: number): Promise<number> {
    const { rows } = await sql`
      SELECT COUNT(*) as count
      FROM comments
      WHERE conversation_id = ${conversationId}
    `;

    return parseInt(rows[0].count, 10);
  }

  /**
   * Retrieves comments for a specific conversation.
   *
   * @param conversationId - The ID of the conversation for which to retrieve comments.
   * @returns A promise that resolves to an array of comments.
   *
   * Each comment includes:
   * - `id`: The comment's ID.
   * - `content`: The content of the comment.
   * - `createdAt`: The date and time when the comment was created.
   * - `updatedAt`: The date and time when the comment was last updated.
   * - `userId`: The ID of the user who made the comment.
   * - `user`: An object containing the user's details:
   *   - `id`: The user's ID.
   *   - `username`: The user's username.
   */
  async getCommentsForConversation(conversationId: number): Promise<Comment[]> {
    const { rows } = await sql`
      SELECT c.id, c.content, c.created_at, c.updated_at, c.user_id,
             u.username as user_username
      FROM comments c
      JOIN users u ON c.user_id = u.id
      WHERE c.conversation_id = ${conversationId}
      ORDER BY c.created_at ASC
    `;

    return rows.map(CommentMapper.toDomain);
  }
}
