
import React, { useState } from 'react';
import { Image, FileText, Video, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuth } from '@/contexts/AuthContext';
import { createPost } from '@/lib/mockData';
import { useToast } from '@/components/ui/use-toast';

interface CreatePostFormProps {
  onPostCreated: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const getInitials = (name: string = '') => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create a post",
        variant: "destructive",
      });
      return;
    }

    if (!content.trim()) {
      toast({
        description: "Post content cannot be empty",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      createPost(content, user.id);
      setContent('');
      toast({
        description: "Post created successfully",
      });
      onPostCreated();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create post",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!user) return null;

  return (
    <Card className="mb-4">
      <CardContent className="pt-4">
        <form onSubmit={handleSubmit}>
          <div className="flex items-start space-x-3 mb-3">
            <Avatar>
              <AvatarImage src={user.avatar} />
              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
            </Avatar>
            <Textarea
              placeholder="Share something with your network..."
              className="flex-1 focus-visible:ring-blue-500"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-2">
              <Button type="button" variant="ghost" size="sm" className="text-gray-500">
                <Image className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Photo</span>
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-gray-500">
                <Video className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Video</span>
              </Button>
              <Button type="button" variant="ghost" size="sm" className="text-gray-500">
                <FileText className="h-4 w-4 mr-1" />
                <span className="hidden sm:inline">Document</span>
              </Button>
            </div>
            
            <Button 
              type="submit" 
              disabled={!content.trim() || isSubmitting}
              className="gap-1"
            >
              {isSubmitting ? 'Posting...' : 'Post'}
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default CreatePostForm;
