import { sql } from '@vercel/postgres';
import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/interfaces/UserRepository';
import { UserMapper } from '@/infrastructure/mappers/UserMapper';

export class VercelPostgresUserRepository implements UserRepository {
  /**
   * Creates a new user in the database.
   *
   * @param user - An object containing the user's details, excluding 'id', 'createdAt', and 'updatedAt'.
   * @returns A promise that resolves to the created user object.
   */
  async createUser(user: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User> {
    const { rows } = await sql`
      INSERT INTO users (full_name, username, email, password_hash)
      VALUES (${user.fullName}, ${user.username}, ${user.email}, ${user.passwordHash})
      RETURNING id, full_name, username, email, password_hash, created_at, updated_at
    `;

    return UserMapper.toDomain(rows[0]);
  }

  /**
   * Retrieves a user by their username from the database.
   *
   * @param username - The username of the user to retrieve.
   * @returns A promise that resolves to the user object if found, or null if not found.
   */
  async getUserByUsername(username: string): Promise<User | null> {
    const { rows } = await sql`
      SELECT * FROM users WHERE username = ${username}
    `;

    return rows.length > 0 ? UserMapper.toDomain(rows[0]) : null;
  }

  /**
   * Retrieves a user by their email address from the database.
   *
   * @param email - The email address of the user to retrieve.
   * @returns A promise that resolves to the user if found, or null if no user is found.
   */
  async getUserByEmail(email: string): Promise<User | null> {
    const { rows } = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    return rows.length > 0 ? UserMapper.toDomain(rows[0]) : null;
  }
}
