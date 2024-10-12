export interface Post {
  id: number;
  title: string;
  content: string;
  user: {
    id: number;
    username: string;
    avatarUrl: string;
  };
  topic: string;
  timestamp: string;
  commentsCount: number;
}
