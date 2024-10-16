import { User } from '@/core/entities/User';
import { UserDTO } from '@/core/dtos/UserDTO';
import { CreatedUserDTO } from '@/core/dtos/UserDTO';

export class UserMapper {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain(row: any): User {
    return {
      id: row.id,
      fullName: row.full_name,
      username: row.username,
      email: row.email,
      passwordHash: row.password_hash,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
      emailVerified: row.email_verified || false,
      verificationToken: row.verification_token || undefined,
      verificationTokenExpiresAt: row.verification_token_expires_at
        ? new Date(row.verification_token_expires_at)
        : undefined,
    };
  }

  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      emailVerified: user.emailVerified,
    };
  }

  static toCreatedDTO(user: User): CreatedUserDTO {
    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt.toISOString(),
    };
  }
}
