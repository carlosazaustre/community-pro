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

export interface User {
  id: number;
  username: string;
}

export interface Topic {
  id: number;
  name: string;
}
