'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { useToast } from '@/shared/hooks/use-toast';

interface CommentFormProps {
  conversationId: number;
  onAddComment: (comment: string) => void;
}

export default function CommentForm({ conversationId, onAddComment }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) {
      toast({
        title: 'Inicia sesión',
        description: 'Debes iniciar sesión para poder comentar.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/conversations/${conversationId}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const newComment = await response.json();
      onAddComment(newComment);
      setContent('');
      toast({
        title: 'Comentario añadido',
        description: 'Tu comentario ha sido añadido correctamente.',
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: 'Failed to add comment',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Añade un comentario</h3>
      <Textarea
        placeholder="Escribe tu comentario aquí..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={4}
      />
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Publicando...' : 'Publicar comentario'}
      </Button>
    </form>
  );
}
