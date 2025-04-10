
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, ThumbsUp, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Textarea } from '@/components/ui/textarea';
import { Post, User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { createComment, getCommentsByPost, likePost } from '@/lib/mockData';

interface PostItemProps {
  post: Post;
  onLike: (postId: string) => void;
}

const PostItem: React.FC<PostItemProps> = ({ post, onLike }) => {
  const { user } = useAuth();
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState<any[]>([]);
  const author = post.author as User;

  const getInitials = (name: string) => {
    return name?.split(' ').map((n) => n[0]).join('').toUpperCase() || '';
  };

  const handleLike = () => {
    onLike(post.id);
  };

  const toggleComments = () => {
    setShowComments(!showComments);
    if (!showComments && comments.length === 0) {
      loadComments();
    }
  };

  const loadComments = () => {
    const postComments = getCommentsByPost(post.id);
    setComments(postComments);
  };

  const handleAddComment = () => {
    if (!user || !commentText.trim()) return;
    
    const newComment = createComment(commentText, user.id, post.id);
    newComment.author = user;
    setComments([newComment, ...comments]);
    setCommentText('');
    loadComments();
  };

  return (
    <div className="linkedin-card mb-4">
      <div className="p-4">
        <div className="flex items-start space-x-3 mb-3">
          <Link to={`/profile/${author?.id}`}>
            <Avatar>
              <AvatarImage src={author?.avatar} />
              <AvatarFallback>{getInitials(author?.name)}</AvatarFallback>
            </Avatar>
          </Link>
          <div>
            <Link to={`/profile/${author?.id}`} className="font-semibold hover:underline">
              {author?.name}
            </Link>
            {author?.headline && (
              <p className="text-sm text-gray-500">{author.headline}</p>
            )}
            <p className="text-xs text-gray-400">
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        
        <div className="mb-3 post-content">{post.content}</div>
        
        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <span>{post.likes} likes</span>
          <span>{post.comments} comments</span>
        </div>
        
        <Separator className="my-2" />
        
        <div className="flex justify-between">
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2"
            onClick={handleLike}
          >
            <ThumbsUp className="h-4 w-4" />
            <span>Like</span>
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="flex-1 gap-2"
            onClick={toggleComments}
          >
            <MessageSquare className="h-4 w-4" />
            <span>Comment</span>
          </Button>
          
          <Button variant="ghost" size="sm" className="flex-1 gap-2">
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
        
        {showComments && (
          <div className="mt-4">
            {user && (
              <div className="flex space-x-3 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.avatar} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add a comment..."
                    className="mb-2"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <Button 
                    size="sm" 
                    onClick={handleAddComment}
                    disabled={!commentText.trim()}
                  >
                    Post
                  </Button>
                </div>
              </div>
            )}
            
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex space-x-3">
                    <Link to={`/profile/${comment.author?.id}`}>
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={comment.author?.avatar} />
                        <AvatarFallback>{getInitials(comment.author?.name)}</AvatarFallback>
                      </Avatar>
                    </Link>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <Link
                          to={`/profile/${comment.author?.id}`}
                          className="font-semibold hover:underline"
                        >
                          {comment.author?.name}
                        </Link>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500 text-sm">No comments yet</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostItem;
