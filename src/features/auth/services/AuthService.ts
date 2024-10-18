import { AuthenticateUserUseCase } from '@/core/use-cases/AuthenticateUserUseCase';
import { CreateUserUseCase } from '@/core/use-cases/CreateUserUseCase';
import { VerifyEmailUseCase } from '@/core/use-cases/VerifyEmailUseCase';
import { RememberMeUseCase } from '@/core/use-cases/RememberMeUseCase';
import { DatabaseUserRepository } from '@/infrastructure/database/DatabaseUserRepository';
import { EmailService } from '@/infrastructure/services/EmailService';

const emailService = new EmailService();
const userRepository = new DatabaseUserRepository();
const createUserUseCase = new CreateUserUseCase(userRepository, emailService);
const authenticateUserUseCase = new AuthenticateUserUseCase(userRepository);
const verifyEmailUseCase = new VerifyEmailUseCase(userRepository);
const rememberMeUseCase = new RememberMeUseCase(userRepository);

/**
 * Authenticates a user with the provided credentials.
 *
 * @param {Credentials} param0 - An object containing the username and password.
 * @param {string} param0.username - The username of the user.
 * @param {string} param0.password - The password of the user.
 * @returns {Promise<any>} A promise that resolves with the authentication result.
 */
interface Credentials {
  username: string;
  password: string;
}

export async function authenticateUser({ username, password }: Credentials) {
  return await authenticateUserUseCase.execute(username, password);
}

/**
 * Registers a new user by executing the createUserUseCase.
 *
 * @param {NewUser} param0 - An object containing the new user's details.
 * @param {string} param0.fullName - The full name of the new user.
 * @param {string} param0.username - The username of the new user.
 * @param {string} param0.email - The email address of the new user.
 * @param {string} param0.password - The password for the new user.
 * @returns {Promise<any>} A promise that resolves when the user is successfully registered.
 */
interface NewUser {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

export async function registerUser({ fullName, username, email, password }: NewUser) {
  return await createUserUseCase.execute({ fullName, username, email, password });
}

/**
 * Verifies the provided email token by executing the verifyEmailUseCase.
 *
 * @param token - The email verification token to be validated.
 * @returns A promise that resolves when the email verification is complete.
 */
export async function verifyEmail(token: string) {
  return await verifyEmailUseCase.execute(token);
}

export async function setRememberMeToken(userId: number): Promise<string> {
  return await rememberMeUseCase.execute(userId);
}

export async function getUserByRememberMeToken(token: string) {
  return await rememberMeUseCase.getUserByToken(token);
}

export async function removeRememberMeToken(userId: number): Promise<void> {
  await rememberMeUseCase.removeToken(userId);
}
