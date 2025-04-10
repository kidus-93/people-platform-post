
import React, { useState, useRef } from 'react';
import { Image, FileText, Video, Send, X } from 'lucide-react';
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
  const [postImage, setPostImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

    if (!content.trim() && !postImage) {
      toast({
        description: "Post content or image is required",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Create post with content and image if available
      createPost(content, user.id, postImage);
      setContent('');
      setPostImage(null);
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPostImage(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setPostImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
          
          {postImage && (
            <div className="relative mt-2 mb-3">
              <img 
                src={postImage} 
                alt="Post preview" 
                className="rounded-lg w-full max-h-96 object-contain" 
              />
              <Button 
                type="button" 
                size="icon" 
                variant="destructive" 
                className="absolute top-2 right-2 h-8 w-8 rounded-full"
                onClick={removeImage}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
          
          <input 
            type="file" 
            ref={fileInputRef} 
            className="hidden" 
            accept="image/*" 
            onChange={handleFileChange}
          />
          
          <div className="flex justify-between items-center mt-3">
            <div className="flex space-x-2">
              <Button 
                type="button" 
                variant="ghost" 
                size="sm" 
                className="text-gray-500"
                onClick={triggerFileInput}
              >
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
              disabled={(!content.trim() && !postImage) || isSubmitting}
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
