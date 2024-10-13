'use client';

import { useState } from 'react';
import { ConversationDetailsDTO } from '@/application/dtos/ConversationDetailsDTO';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { CalendarDays, MessageCircle, ThumbsUp, Tag } from 'lucide-react';

interface ConversationDetailsClientProps {
  conversationDetails: ConversationDetailsDTO;
}

export default function ConversationDetail({
  conversationDetails,
}: ConversationDetailsClientProps) {
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    /// TODO: add new comments
    console.log('Nuevo comentario:', newComment);
    setNewComment('');
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-10">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt={conversationDetails.user.username}
                />
                <AvatarFallback>
                  {conversationDetails.user.username
                    .substring(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{conversationDetails.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  por @{conversationDetails.user.username}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <CalendarDays className="w-4 h-4" />
              <span>
                {new Date(conversationDetails.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <p className="mb-4">{conversationDetails.content}</p>
          <div className="flex items-center space-x-4 mb-4">
            <div className="flex items-center space-x-1">
              <MessageCircle className="w-4 h-4" />
              <span>{conversationDetails.comments.length} comentarios</span>
            </div>
          </div>
          {conversationDetails.topic && (
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-1 bg-primary/10 text-primary rounded-full px-2 py-1 text-sm">
                <Tag className="w-4 h-4" />
                <span>{conversationDetails.topic.name}</span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Comentarios</h2>
        <div className="space-y-4">
          {conversationDetails.comments.map((comment) => (
            <div key={comment.id} className="bg-secondary/30 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt={comment.user.username}
                  />
                  <AvatarFallback>
                    {comment.user.username.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">@{comment.user.username}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <p className="text-sm mb-2">{comment.content}</p>
              <Button variant="ghost" size="sm" className="text-xs">
                <ThumbsUp className="w-3 h-3 mr-1" />
                Me gusta
              </Button>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      <form onSubmit={handleCommentSubmit} className="space-y-4">
        <h3 className="text-xl font-semibold">Añadir un comentario</h3>
        <Textarea
          placeholder="Escribe tu comentario aquí..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows={4}
        />
        <Button type="submit">Publicar comentario</Button>
      </form>
    </div>
  );
}
