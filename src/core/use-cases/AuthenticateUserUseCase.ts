import { UserRepository } from '@/core/interfaces/UserRepository';
import { AuthenticatedUserDTO } from '@/core/dtos/AuthenticatedUserDTO';
import { AuthMapper } from '@/infrastructure/mappers/AuthMapper';
import bcrypt from 'bcrypt';

/**
 * Use case for authenticating a user.
 *
 * @class AuthenticateUserUseCase
 * @constructor
 * @param {UserRepository} userRepository - The repository to access user data.
 *
 * @method execute
 * @async
 * @param {string} username - The username of the user to authenticate.
 * @param {string} password - The password of the user to authenticate.
 * @returns {Promise<Omit<User, 'passwordHash'> | null>} - Returns the user data without the password hash if authentication is successful, otherwise returns null.
 */
export class AuthenticateUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(username: string, password: string): Promise<AuthenticatedUserDTO | null> {
    const user = await this.userRepository.getUserByUsername(username);

    if (!user || !user.passwordHash) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

    if (!isPasswordValid) {
      return null;
    }

    return AuthMapper.toDTO(user);
  }
}
