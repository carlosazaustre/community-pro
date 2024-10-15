import Link from 'next/link';
import { ConversationDTO } from '@/core/dtos/ConversationDTO';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/shared/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar';
import { Badge } from '@/shared/components/ui/badge';
import { MessageSquare, Pin } from 'lucide-react';

interface ConversationCardProps {
  conversation: ConversationDTO;
}

export default function ConversationCard({ conversation }: ConversationCardProps) {
  return (
    <Card>
      <Link href={`/conversation/${conversation.id}`}>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage src={`https://avatar.vercel.sh/${conversation.user.username}`} />
                <AvatarFallback>{conversation.user.username.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{conversation.title}</CardTitle>
                <p className="text-sm text-muted-foreground">By {conversation.user.username}</p>
              </div>
            </div>
            {conversation.isPinned && (
              <Badge variant="secondary">
                <Pin className="h-3 w-3 mr-1" />
                Pinned
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <p>{conversation.content.substring(0, 150)}...</p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{conversation.commentCount} comments</span>
          </div>
          {conversation.topic && <Badge variant="outline">{conversation.topic.name}</Badge>}
        </CardFooter>
      </Link>
    </Card>
  );
}
