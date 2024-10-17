export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date | null;
  userId: number;
  conversationId: number;
  username?: string;
}
