
import React, { useState, useEffect } from 'react';
import { getPosts, likePost } from '@/lib/mockData';
import PostItem from './PostItem';
import { Post } from '@/types';

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  const loadPosts = () => {
    try {
      const allPosts = getPosts();
      setPosts(allPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleLike = (postId: string) => {
    try {
      likePost(postId);
      loadPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading posts...
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="linkedin-card p-6 text-center">
        <p className="text-gray-500 mb-2">No posts yet</p>
        <p className="text-sm">Create a post or connect with more people to see their updates here.</p>
      </div>
    );
  }

  return (
    <div>
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onLike={handleLike} />
      ))}
    </div>
  );
};

export default PostList;
