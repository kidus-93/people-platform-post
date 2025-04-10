
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';

interface ProfileCardProps {
  profile: User;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ profile }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const isCurrentUser = user?.id === profile.id;

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  return (
    <Card className="mb-4 overflow-hidden">
      <div className="h-24 bg-gradient-to-r from-blue-500 to-blue-600" />
      <CardContent className="relative pt-0">
        <div className="-mt-12 mb-4 flex justify-between">
          <Avatar className="h-24 w-24 border-4 border-white">
            <AvatarImage src={profile.avatar} />
            <AvatarFallback className="text-2xl">{getInitials(profile.name)}</AvatarFallback>
          </Avatar>
          {isCurrentUser && (
            <Button 
              size="sm" 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/edit-profile')}
            >
              <Pencil className="h-4 w-4 mr-1" />
              Edit Profile
            </Button>
          )}
        </div>
        
        <h2 className="text-2xl font-bold">{profile.name}</h2>
        {profile.headline && (
          <p className="text-gray-600 mt-1">{profile.headline}</p>
        )}
        
        <div className="flex flex-col space-y-1 mt-3 text-sm text-gray-500">
          {profile.location && (
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2" />
              <span>{profile.location}</span>
            </div>
          )}
          {(profile.company || profile.position) && (
            <div className="flex items-center">
              <Briefcase className="h-4 w-4 mr-2" />
              <span>
                {profile.position}
                {profile.position && profile.company && ' at '}
                {profile.company}
              </span>
            </div>
          )}
        </div>
        
        {profile.bio && (
          <div className="mt-4">
            <h3 className="font-semibold mb-1">About</h3>
            <p className="text-gray-700">{profile.bio}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
