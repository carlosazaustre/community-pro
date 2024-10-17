import { User } from '@/core/entities/User';
import { AuthenticatedUserDTO } from '@/core/dtos/AuthenticatedUserDTO';

export class AuthMapper {
  static toDTO(user: User): AuthenticatedUserDTO {
    return {
      id: user.id.toString(),
      username: user.username,
      email: user.email,
    };
  }
}
