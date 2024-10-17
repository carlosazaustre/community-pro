import { ConversationDTO } from './ConversationDTO';
import { CommentDTO } from './CommentDTO';

export interface ConversationDetailsDTO extends ConversationDTO {
  comments: CommentDTO[];
}
