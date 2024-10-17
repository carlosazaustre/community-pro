export interface CommentDTO {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string | null;
  userId: number;
  conversationId: number;
  user: {
    id: number;
    username: string;
  };
}
