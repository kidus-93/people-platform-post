
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProfileCard from '@/components/profile/ProfileCard';
import PostList from '@/components/post/PostList';
import { getUser, getPostsByUser } from '@/lib/mockData';
import { Post, User } from '@/types';

const Profile = () => {
  const { userId } = useParams<{ userId: string }>();
  const [profile, setProfile] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    try {
      const user = getUser(userId);
      if (user) {
        setProfile(user);
        const userPosts = getPostsByUser(userId);
        setPosts(userPosts);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  if (loading) {
    return (
      <div className="linkedin-container py-10 text-center text-gray-500">
        Loading profile...
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="linkedin-container py-10 text-center">
        <h2 className="text-xl font-semibold">User not found</h2>
        <p className="text-gray-500 mt-2">
          The profile you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <div className="linkedin-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <ProfileCard profile={profile} />
        </div>
        
        <div className="hidden md:block">
          {/* Sidebar content could go here */}
          <div className="linkedin-card p-4">
            <h3 className="font-semibold mb-2">Profile Strength</h3>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full" 
                style={{ width: '70%' }} 
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Your profile is 70% complete. Add more details to increase visibility.
            </p>
          </div>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="font-semibold text-xl mb-4">Posts</h2>
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="linkedin-card mb-4 p-4">
                <p className="mb-3">{post.content}</p>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{post.likes} likes</span>
                  <span>{post.comments} comments</span>
                </div>
              </div>
            ))
          ) : (
            <div className="linkedin-card p-6 text-center">
              <p className="text-gray-500">No posts yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
