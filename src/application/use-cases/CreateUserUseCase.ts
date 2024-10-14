import { UserRepository } from '@/domain/interfaces/UserRepository';
import { User } from '../../domain/entities/User';
import bcrypt from 'bcrypt';

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
  constructor(private userRepository: UserRepository) {}

  async execute(
    userData: Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'passwordHash'> & { password: string }
  ): Promise<User> {
    const existingUser = await this.userRepository.getUserByUsername(userData.username);
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const existingEmail = await this.userRepository.getUserByEmail(userData.email);
    if (existingEmail) {
      throw new Error('Email already exists');
    }

    const passwordHash = await bcrypt.hash(userData.password, 10);

    return this.userRepository.createUser({
      ...userData,
      passwordHash,
    });
  }
}
