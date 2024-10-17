export interface CommentRow {
  id: number;
  content: string;
  created_at: string;
  updated_at: string | null;
  user_id: number;
  user_username: string;
}
