export interface UserDTO {
  id: number;
  fullName: string;
  username: string;
  email: string;
  emailVerified: boolean;
}

export interface CreatedUserDTO {
  id: number;
  fullName: string;
  username: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
}
