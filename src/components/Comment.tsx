import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { ThumbsUp } from 'lucide-react';

interface CommentProps {
  username: string;
  content: string;
  createdAt: string;
}

export default function Comment({ username, content, createdAt }: CommentProps) {
  return (
    <div className="bg-secondary/30 rounded-lg p-4">
      <div className="flex items-center space-x-3 mb-2">
        <Avatar className="w-8 h-8">
          <AvatarImage src="/placeholder.svg?height=32&width=32" alt={username} />
          <AvatarFallback>{username.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold">@{username}</p>
          <p className="text-xs text-muted-foreground">{new Date(createdAt).toLocaleDateString()}</p>
        </div>
      </div>
      <p className="text-sm mb-2">{content}</p>
      <Button variant="ghost" size="sm" className="text-xs">
        <ThumbsUp className="w-3 h-3 mr-1" />
        Me gusta
      </Button>
    </div>
  );
}
