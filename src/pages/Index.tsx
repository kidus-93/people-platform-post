
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePostForm from '@/components/post/CreatePostForm';
import PostList from '@/components/post/PostList';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';

const Index = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [refreshPosts, setRefreshPosts] = useState(0);

  const handlePostCreated = () => {
    setRefreshPosts(prev => prev + 1);
  };

  return (
    <div className="linkedin-container">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Left Sidebar */}
        <div className="hidden md:block">
          {user ? (
            <Card>
              <CardContent className="p-4">
                <div className="text-center">
                  <div 
                    className="h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-lg mb-8 -mx-4 -mt-4"
                  />
                  <div 
                    className="cursor-pointer" 
                    onClick={() => navigate(`/profile/${user.id}`)}
                  >
                    <img 
                      src={user.avatar || 'https://via.placeholder.com/150'} 
                      alt={user.name}
                      className="h-16 w-16 rounded-full mx-auto -mt-12 border-4 border-white"
                    />
                    <h3 className="font-semibold mt-2">{user.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{user.headline || "Add a headline"}</p>
                </div>
                
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Who viewed your profile</span>
                    <span className="font-semibold">21</span>
                  </div>
                  <div className="flex justify-between text-sm mt-2">
                    <span className="text-gray-500">Views of your post</span>
                    <span className="font-semibold">145</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="p-4">
                <p className="font-semibold mb-2">Welcome to your professional community</p>
                <p className="text-sm text-gray-500 mb-4">
                  Join LinkedIn Clone to connect with professionals and stay updated 
                  with industry news.
                </p>
                <button 
                  className="w-full bg-primary text-white py-2 rounded-lg"
                  onClick={() => navigate('/register')}
                >
                  Join Now
                </button>
              </CardContent>
            </Card>
          )}
        </div>
        
        {/* Main Content */}
        <div className="md:col-span-2">
          {user && <CreatePostForm onPostCreated={handlePostCreated} />}
          <PostList key={refreshPosts} />
        </div>
      </div>
    </div>
  );
};

export default Index;
