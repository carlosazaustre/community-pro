import { User } from '@/core/entities/User';
import { UserRepository } from '@/core/interfaces/UserRepository';
import { UserMapper } from '@/infrastructure/mappers/UserMapper';
import { sql } from '@vercel/postgres';

export class DatabaseUserRepository implements UserRepository {
  /**
   * Creates a new user in the database.
   *
   * @param user - An object containing the user's details, excluding 'id', 'createdAt', 'updatedAt', 'verificationToken', and 'verificationTokenExpiresAt'.
   * @returns A promise that resolves to the created user.
   *
   * @throws Will throw an error if the database operation fails.
   */
  async createUser(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'verificationToken' | 'verificationTokenExpiresAt'>
  ): Promise<User> {
    const { rows } = await sql`
      INSERT INTO users (full_name, username, email, password_hash, email_verified)
      VALUES (${user.fullName}, ${user.username}, ${user.email}, ${user.passwordHash}, ${user.emailVerified})
      RETURNING id, full_name, username, email, password_hash, created_at, updated_at, email_verified
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

  /**
   * Sets a verification token for a user in the database.
   *
   * @param userId - The unique identifier of the user.
   * @param token - The verification token to be set.
   * @param expiresAt - The expiration date and time of the verification token.
   * @returns A promise that resolves when the operation is complete.
   */
  async setVerificationToken(userId: number, token: string, expiresAt: Date): Promise<void> {
    await sql`
      UPDATE users
      SET verification_token = ${token}, verification_token_expires_at = ${expiresAt.toISOString()}
      WHERE id = ${userId}
    `;
  }

  /**
   * Retrieves a user by their verification token.
   *
   * @param token - The verification token associated with the user.
   * @returns A promise that resolves to the user if found, otherwise null.
   */
  async getByVerificationToken(token: string): Promise<User | null> {
    const { rows } = await sql`
      SELECT * FROM users WHERE verification_token = ${token}
    `;
    return rows.length > 0 ? UserMapper.toDomain(rows[0]) : null;
  }

  /**
   * Updates the email verification status of a user in the database.
   *
   * @param userId - The unique identifier of the user.
   * @param verified - A boolean indicating whether the user's email is verified.
   * @returns A promise that resolves when the update operation is complete.
   */
  async updateEmailVerification(userId: number, verified: boolean): Promise<void> {
    await sql`
      UPDATE users
      SET email_verified = ${verified}, verification_token = NULL, verification_token_expires_at = NULL
      WHERE id = ${userId}
    `;
  }
}
