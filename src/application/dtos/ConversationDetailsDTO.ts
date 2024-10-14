import { ConversationDTO } from './ConversationDTO';

export interface CommentDTO {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: number;
    username: string;
  };
}

export interface ConversationDetailsDTO extends ConversationDTO {
  comments: CommentDTO[];
}
