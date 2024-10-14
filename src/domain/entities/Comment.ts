export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  userId: number;
  conversationId: number;
  user: {
    id: number;
    username: string;
  };
}
