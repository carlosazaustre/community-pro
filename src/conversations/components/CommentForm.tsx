'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';
import { useToast } from '@/shared/hooks/use-toast';

interface CommentFormProps {
  onSubmit: (content: string) => Promise<void>;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session, status } = useSession();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status !== 'authenticated' || !session?.user?.id) {
      toast({
        title: 'Error',
        description: 'Debes iniciar sesión para poder comentar.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(content);
      setContent('');
      toast({
        title: 'Comentario añadido',
        description: 'Tu comentario ha sido añadido correctamente.',
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: 'Error',
        description: error instanceof Error ? error.message : 'Fallo al añadir el comentario',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return <p>Please sign in to comment.</p>;
  }

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
