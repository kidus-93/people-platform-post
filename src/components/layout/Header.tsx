
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, Search, Users, Bell, MessageSquare, Briefcase, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getInitials = (name: string) => {
    return name.split(' ').map((n) => n[0]).join('').toUpperCase();
  };

  return (
    <header className="sticky top-0 bg-white border-b border-gray-200 z-50">
      <div className="linkedin-container flex items-center justify-between h-14">
        <div className="flex items-center gap-2 md:gap-4">
          <Link to="/" className="text-primary font-bold text-2xl flex items-center">
            <span className="bg-primary text-white px-2 py-1 rounded">in</span>
          </Link>
          
          <div className="hidden md:flex relative max-w-md w-full">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search"
              className="pl-8 bg-gray-100 border-none focus-visible:ring-gray-300"
            />
          </div>
        </div>
        
        <nav className="flex items-center">
          {user ? (
            <>
              <div className="flex items-center space-x-1 md:space-x-6">
                <NavItem icon={<Home />} label="Home" to="/" />
                <NavItem icon={<Users />} label="My Network" to="/network" />
                <NavItem icon={<Briefcase />} label="Jobs" to="/jobs" />
                <NavItem icon={<MessageSquare />} label="Messaging" to="/messages" />
                <NavItem icon={<Bell />} label="Notifications" to="/notifications" />
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-1 md:p-2 rounded-full" size="icon">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>
                      <div className="flex flex-col space-y-1">
                        <span className="font-semibold">{user.name}</span>
                        <span className="text-xs text-gray-500">{user.headline || "No headline"}</span>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate(`/profile/${user.id}`)}>
                      View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/settings')}>
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild>
                <Link to="/register">Join now</Link>
              </Button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  to: string;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, to }) => {
  return (
    <Link to={to} className="flex flex-col items-center text-gray-500 hover:text-black">
      <div className="md:mb-1">{icon}</div>
      <span className="text-xs hidden md:block">{label}</span>
    </Link>
  );
};

export default Header;
