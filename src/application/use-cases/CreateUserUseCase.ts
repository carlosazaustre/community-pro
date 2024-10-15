import { User } from '@/domain/entities/User';
import { UserRepository } from '@/domain/interfaces/UserRepository';
import { EmailService } from '@/infrastructure/services/EmailService';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

/**
 * Use case for creating a new user.
 *
 * @class CreateUserUseCase
 * @constructor
 * @param {UserRepository} userRepository - The repository to manage user data.
 */

/**
 * Executes the use case to create a new user.
 *
 * @method execute
 * @async
 * @param {Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'passwordHash'> & { password: string }} userData
 *  - The data of the user to be created, excluding id, createdAt, updatedAt, and passwordHash,
 *    but including a plain text password.
 * @returns {Promise<User>} The created user.
 * @throws {Error} If the username or email already exists.
 */
export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private emailService: EmailService
  ) {}

  async execute(userData: { fullName: string; username: string; email: string; password: string }): Promise<User> {
    try {
      console.log('Checking for existing user...');
      const existingUser = await this.userRepository.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }

      console.log('Hashing password...');
      const passwordHash = await bcrypt.hash(userData.password, 10);

      console.log('Creating user in database...');
      const user = await this.userRepository.createUser({
        ...userData,
        passwordHash,
        emailVerified: false,
      });

      console.log('Generating verification token...');
      const verificationToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiresAt = new Date();
      tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 24); // Token expires in 24 hours

      console.log('Setting verification token...');
      await this.userRepository.setVerificationToken(user.id, verificationToken, tokenExpiresAt);

      console.log('Sending verification email...');
      await this.emailService.sendVerificationEmail(user.email, verificationToken);

      console.log('User creation process completed successfully');
      return user;
    } catch (error) {
      console.error('Error in CreateUserUseCase:', error);
      throw error; // Re-lanza el error para que pueda ser manejado en la capa superior
    }
  }
}
