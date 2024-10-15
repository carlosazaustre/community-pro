import { UserRepository } from '@/domain/interfaces/UserRepository';

/**
 * Use case for verifying a user's email.
 *
 * @class VerifyEmailUseCase
 * @constructor
 * @param {UserRepository} userRepository - The repository to access user data.
 */

/**
 * Executes the email verification process using the provided token.
 *
 * @param token - The verification token to validate the user's email.
 * @throws {Error} If the verification token is invalid or has expired.
 * @returns {Promise<void>} A promise that resolves when the email verification is complete.
 */
export class VerifyEmailUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(token: string): Promise<void> {
    const user = await this.userRepository.getByVerificationToken(token);
    if (!user) {
      throw new Error('Invalid verification token');
    }

    if (user.verificationTokenExpiresAt && user.verificationTokenExpiresAt < new Date()) {
      throw new Error('Verification token has expired');
    }

    await this.userRepository.updateEmailVerification(user.id, true);
  }
}
