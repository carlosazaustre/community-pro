export interface ConversationDTO {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isPinned: boolean;
  user: {
    id: number;
    username: string;
  };
  topic: {
    id: number;
    name: string;
  } | null;
  commentCount: number;
}
