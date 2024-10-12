import React from 'react';
import Image from 'next/image';
import { Avatar } from '@/components/ui/avatar';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Post } from '@/types';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  return (
    <Card className="mb-6">
      <CardHeader>
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-2">
            <Image
              width={40}
              height={40}
              src={post.user.avatarUrl}
              alt={post.user.username}
            />
          </Avatar>
          <div>
            <h3 className="text-sm font-medium text-gray-900">
              {post.user.username}
            </h3>
            <p className="text-sm text-gray-500">
              {new Date(post.timestamp).toLocaleString()}
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">
          {post.title}
        </h2>
        <p className="text-gray-700 mb-4">{post.content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Badge variant="secondary">{post.topic}</Badge>
        <span className="text-sm text-gray-500">
          {post.commentsCount} comments
        </span>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
