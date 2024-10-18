import { CreatedUserDTO } from '@/core/dtos/UserDTO';
import { UserRepository } from '@/core/interfaces/UserRepository';
import { UserMapper } from '@/infrastructure/mappers/UserMapper';
import { EmailService } from '@/infrastructure/services/EmailService';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

/**
 * Use case for creating a new user.
 *
 * @class CreateUserUseCase
 * @constructor
 * @param {UserRepository} userRepository - The repository to manage user data.
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

  async execute(userData: {
    fullName: string;
    username: string;
    email: string;
    password: string;
  }): Promise<CreatedUserDTO> {
    try {
      const existingUser = await this.userRepository.getUserByEmail(userData.email);
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const passwordHash = await bcrypt.hash(userData.password, 10);
      const user = await this.userRepository.createUser({
        ...userData,
        passwordHash,
        emailVerified: false,
      });

      const verificationToken = crypto.randomBytes(32).toString('hex');
      const tokenExpiresAt = new Date();
      tokenExpiresAt.setHours(tokenExpiresAt.getHours() + 24); // Token expires in 24 hours

      await this.userRepository.setVerificationToken(user.id, verificationToken, tokenExpiresAt);
      await this.emailService.sendVerificationEmail(user.email, verificationToken);

      return UserMapper.toCreatedDTO(user);
    } catch (error) {
      console.error('Error in CreateUserUseCase:', error);
      throw error;
    }
  }
}
