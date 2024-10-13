import { User } from './User';

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  conversationId: number;
  user: User;
}
