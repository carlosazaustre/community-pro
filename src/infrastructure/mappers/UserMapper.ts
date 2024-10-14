import { User } from '@/domain/entities/User';
import { UserDTO } from '@/application/dtos/UserDTO';

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
    };
  }

  static toDTO(user: User): UserDTO {
    return {
      id: user.id,
      fullName: user.fullName,
      username: user.username,
      email: user.email,
    };
  }
}
