import { User } from '@/domain/entities/User';

export interface UserRepository {
  createUser(
    user: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'verificationToken' | 'verificationTokenExpiresAt'>
  ): Promise<User>;
  getUserByUsername(username: string): Promise<User | null>;
  getUserByEmail(email: string): Promise<User | null>;
  setVerificationToken(userId: number, token: string, expiresAt: Date): Promise<void>;
  getByVerificationToken(token: string): Promise<User | null>;
  updateEmailVerification(userId: number, verified: boolean): Promise<void>;
}
