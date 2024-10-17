'use client';

import { ConversationDetailsDTO } from '@/core/dtos/ConversationDetailsDTO';
import { CommentDTO } from '@/core/dtos/CommentDTO';
import Comment from '@/conversations/components/Comment';
import CommentForm from '@/conversations/components/CommentForm';
import { useComments } from '@/conversations/hooks/useComments';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { Separator } from '@/shared/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { CalendarDays, MessageCircle, Tag } from 'lucide-react';
import { useToast } from '@/shared/hooks/use-toast';

interface ConversationHeaderProps {
  title: string;
  username: string;
  createdAt: string;
}

function ConversationHeader({ title, username, createdAt }: ConversationHeaderProps) {
  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" alt={username} />
            <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{title}</CardTitle>
            <p className="text-sm text-muted-foreground">por @{username}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <CalendarDays className="w-4 h-4" />
          <span>{new Date(createdAt).toLocaleDateString()}</span>
        </div>
      </div>
    </CardHeader>
  );
}

interface ConversationContentProps {
  content: string;
  commentCount: number;
  topic?: { id: number; name: string } | null;
}

function ConversationContent({ content, commentCount, topic }: ConversationContentProps) {
  return (
    <CardContent>
      <p className="mb-4">{content}</p>
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          <MessageCircle className="w-4 h-4" />
          <span>{commentCount} comentarios</span>
        </div>
      </div>
      {topic && (
        <div className="flex flex-wrap gap-2">
          <div className="flex items-center space-x-1 bg-primary/10 text-primary rounded-full px-2 py-1 text-sm">
            <Tag className="w-4 h-4" />
            <span>{topic.name}</span>
          </div>
        </div>
      )}
    </CardContent>
  );
}

interface ConversationDetailsProps {
  conversationDetails: ConversationDetailsDTO;
}

export default function ConversationDetails({ conversationDetails }: ConversationDetailsProps) {
  const { comments, addComment } = useComments(
    conversationDetails.comments as CommentDTO[],
    conversationDetails.id
  );
  const { toast } = useToast();

  console.info(`Rendering ConversationDetails for conversation ${conversationDetails.id}`);
  console.debug(`Initial comments count: ${comments.length}`);

  const handleAddComment = async (content: string) => {
    try {
      console.info(`Attempting to add comment to conversation ${conversationDetails.id}`);
      await addComment(content);
      console.info('Comment added successfully');
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Fallo al añadir el comentario',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <Card>
        <ConversationHeader
          title={conversationDetails.title}
          username={conversationDetails.user.username}
          createdAt={conversationDetails.createdAt}
        />
        <ConversationContent
          content={conversationDetails.content}
          commentCount={conversationDetails.comments.length}
          topic={conversationDetails.topic}
        />
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comentarios</h2>
        <div className="space-y-4">
          {comments.map((comment) => (
            <Comment
              key={comment.id}
              username={comment.user.username || 'Anónimo'}
              content={comment.content}
              createdAt={comment.createdAt}
            />
          ))}
        </div>
      </div>

      <Separator />

      <CommentForm onSubmit={handleAddComment} />
    </div>
  );
}
