'use client';

import React from 'react';
import PostCard from './PostCard';
import { Post } from '@/types';

interface ConversationListProps {
  posts: Post[];
}

const ConversationList: React.FC<ConversationListProps> = ({ posts }) => {
  return (
    <>
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Recent Posts</h1>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </>
  );
};

export default ConversationList;
