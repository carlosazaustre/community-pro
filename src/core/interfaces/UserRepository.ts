import { User } from '@/core/domain/entities/User';

export interface UserRepository {
  createUser(
    user: Omit<
      User,
      'id' | 'createdAt' | 'updatedAt' | 'verificationToken' | 'verificationTokenExpiresAt'
    >
  ): Promise<User>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  getUserById(id: number): Promise<User | null>;
  setVerificationToken(userId: number, token: string, expiresAt: Date): Promise<void>;
  getByVerificationToken(token: string): Promise<User | null>;
  updateEmailVerification(userId: number, verified: boolean): Promise<void>;
  setRememberMeToken(userId: number, token: string | null): Promise<void>;
  getUserByRememberMeToken(token: string): Promise<User | null>;
}
