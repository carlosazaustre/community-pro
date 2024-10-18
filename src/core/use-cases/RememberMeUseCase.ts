import { User } from '@/core/domain/entities/User';
import { UserRepository } from '@/core/interfaces/UserRepository';
import crypto from 'crypto';

export class RememberMeUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(userId: number): Promise<string> {
    const token = crypto.randomBytes(32).toString('hex');
    await this.userRepository.setRememberMeToken(userId, token);
    return token;
  }

  async getUserByToken(token: string): Promise<User | null> {
    return this.userRepository.getUserByRememberMeToken(token);
  }

  async removeToken(userId: number): Promise<void> {
    await this.userRepository.setRememberMeToken(userId, null);
  }
}
