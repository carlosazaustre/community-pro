export interface CommentDTO {
  id: number;
  content: string;
  createdAt: string;
  userId: number;
  conversationId: number;
  user: {
    id: number;
    username: string;
  };
}
