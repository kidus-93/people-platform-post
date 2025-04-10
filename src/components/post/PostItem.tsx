
import React, { useState } from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, ThumbsUp, Share } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Post } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onLike }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [likeAnimating, setLikeAnimating] = useState(false);
  
  const getInitials = (name: string = '') => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };
  
  const handleLike = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    
    setLikeAnimating(true);
    onLike(post.id);
    setTimeout(() => setLikeAnimating(false), 500);
  };
  
  const handleProfileClick = () => {
    if (post.author) {
      navigate(`/profile/${post.author.id}`);
    }
  };
  
  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start space-x-4">
          <div onClick={handleProfileClick} className="cursor-pointer">
            <Avatar>
              <AvatarImage src={post.author?.avatar} />
              <AvatarFallback>{getInitials(post.author?.name)}</AvatarFallback>
            </Avatar>
          </div>
          
          <div className="flex-1 min-w-0">
            <div 
              className="font-semibold hover:underline cursor-pointer"
              onClick={handleProfileClick}
            >
              {post.author?.name}
            </div>
            <div className="text-sm text-gray-500 mb-2">
              {post.author?.headline}
              {post.author?.headline ? ' • ' : ''}
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </div>
            
            {/* Post Content */}
            <div className="post-content mb-3">{post.content}</div>
            
            {/* Post Image (if exists) */}
            {post.image && (
              <div className="mt-2 mb-3">
                <img 
                  src={post.image} 
                  alt="Post image" 
                  className="rounded-lg w-full object-contain max-h-96" 
                />
              </div>
            )}
            
            {/* Post Stats */}
            {(post.likes > 0 || post.comments > 0) && (
              <div className="flex justify-between text-xs text-gray-500 mt-4 pb-2 border-b">
                {post.likes > 0 && (
                  <div className="flex items-center">
                    <span className="inline-flex justify-center items-center w-4 h-4 bg-blue-500 rounded-full mr-1">
                      <ThumbsUp className="w-2 h-2 text-white" />
                    </span>
                    {post.likes}
                  </div>
                )}
                {post.comments > 0 && (
                  <div>{post.comments} comments</div>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="py-2 flex justify-between border-t">
        <Button 
          variant="ghost" 
          size="sm" 
          className={`gap-1 flex-1 ${likeAnimating ? 'text-blue-500' : ''}`}
          onClick={handleLike}
        >
          <ThumbsUp className={`h-4 w-4 ${likeAnimating ? 'text-blue-500 animate-bounce' : ''}`} />
          Like
        </Button>
        <Button variant="ghost" size="sm" className="gap-1 flex-1">
          <MessageSquare className="h-4 w-4" />
          Comment
        </Button>
        <Button variant="ghost" size="sm" className="gap-1 flex-1">
          <Share className="h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostItem;
