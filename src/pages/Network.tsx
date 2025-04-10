
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '@/lib/mockData';
import { User } from '@/types';

const Network = () => {
  const navigate = useNavigate();
  const users = getAllUsers();
  
  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };
  
  const navigateToProfile = (userId: string) => {
    navigate(`/profile/${userId}`);
  };
  
  return (
    <div className="linkedin-container py-6">
      <h1 className="text-2xl font-bold mb-6">My Network</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user: User) => (
          <Card key={user.id} className="shadow-sm hover:shadow transition-shadow">
            <CardContent className="pt-6 pb-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12 cursor-pointer" onClick={() => navigateToProfile(user.id)}>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h3 
                    className="font-semibold truncate cursor-pointer hover:underline"
                    onClick={() => navigateToProfile(user.id)}
                  >
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-500 truncate">
                    {user.headline || 'No headline'}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {user.location || 'No location'}
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => navigateToProfile(user.id)}
                >
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Network;
