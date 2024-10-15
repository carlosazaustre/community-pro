'use client';

import { useState } from 'react';
import { Button } from '@/shared/components/ui/button';
import { Textarea } from '@/shared/components/ui/textarea';

interface CommentFormProps {
  onSubmit: (comment: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
  const [newComment, setNewComment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(newComment);
    setNewComment('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h3 className="text-xl font-semibold">Añadir un comentario</h3>
      <Textarea
        placeholder="Escribe tu comentario aquí..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={4}
      />
      <Button type="submit">Publicar comentario</Button>
    </form>
  );
}
