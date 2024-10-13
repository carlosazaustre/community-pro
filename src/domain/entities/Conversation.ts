export interface Conversation {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  isPinned: boolean;
  userId: number;
  topicId: number | null;
}
