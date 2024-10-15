export interface User {
  id: number;
  fullName: string;
  username: string;
  email: string;
  passwordHash: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: boolean;
  verificationToken?: string;
  verificationTokenExpiresAt?: Date;
}
