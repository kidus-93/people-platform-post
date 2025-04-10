import { User, Post, Comment } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Mock users
const users: Record<string, User> = {};

// Mock posts
const posts: Record<string, Post> = {};

// Mock comments
const comments: Record<string, Comment> = {};

// Local storage keys
const USERS_KEY = 'voices_users';
const POSTS_KEY = 'voices_posts';
const COMMENTS_KEY = 'voices_comments';
const CURRENT_USER_KEY = 'voices_current_user';

// Create 25 demo users
const createDemoUsers = () => {
  const demoUsers = [
    {
      name: 'John Smith',
      email: 'john@example.com',
      password: 'password123',
      headline: 'Software Engineer at Tech Co',
      location: 'San Francisco, CA',
      company: 'Tech Co',
      position: 'Software Engineer',
      bio: 'Passionate about building great software and solving complex problems.'
    },
    {
      name: 'Emma Johnson',
      email: 'emma@example.com',
      password: 'password123',
      headline: 'Marketing Manager at Brand Inc',
      location: 'New York, NY',
      company: 'Brand Inc',
      position: 'Marketing Manager',
      bio: 'Creative marketer with a passion for storytelling and brand building.'
    },
    {
      name: 'Michael Brown',
      email: 'michael@example.com',
      password: 'password123',
      headline: 'Data Scientist at Analytics Co',
      location: 'Austin, TX',
      company: 'Analytics Co',
      position: 'Data Scientist',
      bio: 'Using data to drive insights and build predictive models.'
    },
    {
      name: 'Sarah Davis',
      email: 'sarah@example.com',
      password: 'password123',
      headline: 'UX Designer at Creative Studio',
      location: 'Los Angeles, CA',
      company: 'Creative Studio',
      position: 'UX Designer',
      bio: 'Creating beautiful and intuitive user experiences that delight users.'
    },
    {
      name: 'David Wilson',
      email: 'david@example.com',
      password: 'password123',
      headline: 'Product Manager at Innovate Inc',
      location: 'Seattle, WA',
      company: 'Innovate Inc',
      position: 'Product Manager',
      bio: 'Building products that customers love and that solve real problems.'
    },
    {
      name: 'Jennifer Lee',
      email: 'jennifer@example.com',
      password: 'password123',
      headline: 'Content Strategist at Media Corp',
      location: 'Chicago, IL',
      company: 'Media Corp',
      position: 'Content Strategist',
      bio: 'Crafting compelling content that engages audiences and drives action.'
    },
    {
      name: 'Robert Garcia',
      email: 'robert@example.com',
      password: 'password123',
      headline: 'Frontend Developer at Web Solutions',
      location: 'Miami, FL',
      company: 'Web Solutions',
      position: 'Frontend Developer',
      bio: 'Building beautiful and responsive web interfaces with modern technologies.'
    },
    {
      name: 'Emily Martinez',
      email: 'emily@example.com',
      password: 'password123',
      headline: 'HR Manager at Corporate Inc',
      location: 'Denver, CO',
      company: 'Corporate Inc',
      position: 'HR Manager',
      bio: 'Creating positive workplace cultures and helping employees thrive.'
    },
    {
      name: 'James Wilson',
      email: 'james@example.com',
      password: 'password123',
      headline: 'Backend Developer at Server Pro',
      location: 'Portland, OR',
      company: 'Server Pro',
      position: 'Backend Developer',
      bio: 'Building scalable and reliable server-side applications.'
    },
    {
      name: 'Lisa Anderson',
      email: 'lisa@example.com',
      password: 'password123',
      headline: 'Social Media Manager at Connect Co',
      location: 'Atlanta, GA',
      company: 'Connect Co',
      position: 'Social Media Manager',
      bio: 'Growing brand presence and engagement through strategic social media campaigns.'
    },
    {
      name: 'Daniel Thompson',
      email: 'daniel@example.com',
      password: 'password123',
      headline: 'CTO at Tech Innovations',
      location: 'Boston, MA',
      company: 'Tech Innovations',
      position: 'CTO',
      bio: 'Leading technical teams and developing cutting-edge solutions.'
    },
    {
      name: 'Michelle Clark',
      email: 'michelle@example.com',
      password: 'password123',
      headline: 'Graphic Designer at Creative Labs',
      location: 'San Diego, CA',
      company: 'Creative Labs',
      position: 'Graphic Designer',
      bio: 'Creating visually stunning designs that communicate brand messages effectively.'
    },
    {
      name: 'Kevin Rodriguez',
      email: 'kevin@example.com',
      password: 'password123',
      headline: 'DevOps Engineer at Cloud Systems',
      location: 'Dallas, TX',
      company: 'Cloud Systems',
      position: 'DevOps Engineer',
      bio: 'Building and maintaining cloud infrastructure with a focus on automation.'
    },
    {
      name: 'Amanda White',
      email: 'amanda@example.com',
      password: 'password123',
      headline: 'Project Manager at Solutions Inc',
      location: 'Philadelphia, PA',
      company: 'Solutions Inc',
      position: 'Project Manager',
      bio: 'Delivering projects on time and under budget with a focus on stakeholder satisfaction.'
    },
    {
      name: 'Thomas Johnson',
      email: 'thomas@example.com',
      password: 'password123',
      headline: 'Full Stack Developer at Code Masters',
      location: 'Washington, DC',
      company: 'Code Masters',
      position: 'Full Stack Developer',
      bio: 'Building complete web applications from frontend to backend.'
    },
    {
      name: 'Jessica Taylor',
      email: 'jessica@example.com',
      password: 'password123',
      headline: 'SEO Specialist at Digital Marketing',
      location: 'Nashville, TN',
      company: 'Digital Marketing',
      position: 'SEO Specialist',
      bio: 'Optimizing websites to increase visibility and drive organic traffic.'
    },
    {
      name: 'Christopher Martinez',
      email: 'christopher@example.com',
      password: 'password123',
      headline: 'Mobile Developer at App Factory',
      location: 'Phoenix, AZ',
      company: 'App Factory',
      position: 'Mobile Developer',
      bio: 'Creating engaging and intuitive mobile applications for iOS and Android.'
    },
    {
      name: 'Laura Lopez',
      email: 'laura@example.com',
      password: 'password123',
      headline: 'Content Creator at Media Hub',
      location: 'Las Vegas, NV',
      company: 'Media Hub',
      position: 'Content Creator',
      bio: 'Producing engaging content across multiple platforms and formats.'
    },
    {
      name: 'Andrew Robinson',
      email: 'andrew@example.com',
      password: 'password123',
      headline: 'QA Engineer at Quality Systems',
      location: 'Indianapolis, IN',
      company: 'Quality Systems',
      position: 'QA Engineer',
      bio: 'Ensuring software quality through thorough testing and automation.'
    },
    {
      name: 'Olivia Jackson',
      email: 'olivia@example.com',
      password: 'password123',
      headline: 'Customer Success Manager at Service Co',
      location: 'Charlotte, NC',
      company: 'Service Co',
      position: 'Customer Success Manager',
      bio: 'Ensuring customer satisfaction and driving retention through exceptional service.'
    },
    {
      name: 'Matthew Harris',
      email: 'matthew@example.com',
      password: 'password123',
      headline: 'Data Analyst at Insights Corp',
      location: 'Detroit, MI',
      company: 'Insights Corp',
      position: 'Data Analyst',
      bio: 'Turning data into actionable insights to drive business decisions.'
    },
    {
      name: 'Sophia Miller',
      email: 'sophia@example.com',
      password: 'password123',
      headline: 'UI Designer at Design Solutions',
      location: 'Minneapolis, MN',
      company: 'Design Solutions',
      position: 'UI Designer',
      bio: 'Designing beautiful and functional interfaces that enhance user experience.'
    },
    {
      name: 'William Davis',
      email: 'william@example.com',
      password: 'password123',
      headline: 'Sales Manager at Growth Inc',
      location: 'San Jose, CA',
      company: 'Growth Inc',
      position: 'Sales Manager',
      bio: 'Driving business growth through effective sales strategies and team leadership.'
    },
    {
      name: 'Natalie Moore',
      email: 'natalie@example.com',
      password: 'password123',
      headline: 'Digital Marketer at Engage Agency',
      location: 'Pittsburgh, PA',
      company: 'Engage Agency',
      position: 'Digital Marketer',
      bio: 'Creating and executing digital marketing campaigns that drive results.'
    },
    {
      name: 'Richard Thomas',
      email: 'richard@example.com',
      password: 'password123',
      headline: 'Systems Architect at Cloud Solutions',
      location: 'Baltimore, MD',
      company: 'Cloud Solutions',
      position: 'Systems Architect',
      bio: 'Designing robust and scalable cloud-based systems and architectures.'
    }
  ];

  for (const user of demoUsers) {
    createUser(user.email, user.name, user.password, {
      headline: user.headline,
      location: user.location,
      company: user.company,
      position: user.position,
      bio: user.bio
    });
  }
};

// Initialize data from localStorage
export const initializeData = () => {
  const storedUsers = localStorage.getItem(USERS_KEY);
  const storedPosts = localStorage.getItem(POSTS_KEY);
  const storedComments = localStorage.getItem(COMMENTS_KEY);

  if (storedUsers) {
    Object.assign(users, JSON.parse(storedUsers));
  } else {
    // If no users exist, create demo users
    createDemoUsers();
  }

  if (storedPosts) {
    Object.assign(posts, JSON.parse(storedPosts));
  }

  if (storedComments) {
    Object.assign(comments, JSON.parse(storedComments));
  }
};

// Save data to localStorage
const saveData = () => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  localStorage.setItem(POSTS_KEY, JSON.stringify(posts));
  localStorage.setItem(COMMENTS_KEY, JSON.stringify(comments));
};

// User operations
export const createUser = (email: string, name: string, password: string, additionalInfo: Partial<User> = {}): User => {
  const id = uuidv4();
  const user: User = {
    id,
    email,
    name,
    createdAt: new Date(),
    ...additionalInfo
  };

  // Store the user
  users[id] = user;
  
  // Store password separately (in a real app, this would be hashed)
  localStorage.setItem(`user_pwd_${id}`, password);
  
  saveData();
  return user;
};

export const getAllUsers = (): User[] => {
  return Object.values(users);
};

export const loginUser = (email: string, password: string): User | null => {
  const userFound = Object.values(users).find(user => user.email === email);
  
  if (userFound) {
    const storedPassword = localStorage.getItem(`user_pwd_${userFound.id}`);
    if (storedPassword === password) {
      localStorage.setItem(CURRENT_USER_KEY, userFound.id);
      return userFound;
    }
  }
  
  return null;
};

export const logoutUser = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): User | null => {
  const userId = localStorage.getItem(CURRENT_USER_KEY);
  return userId ? users[userId] : null;
};

export const updateUserProfile = (userId: string, profile: Partial<User>): User => {
  users[userId] = { ...users[userId], ...profile };
  saveData();
  return users[userId];
};

export const getUser = (userId: string): User | null => {
  return users[userId] || null;
};

// Post operations
export const createPost = (content: string, authorId: string, image: string | null = null): Post => {
  const id = uuidv4();
  const post: Post = {
    id,
    content,
    image,
    authorId,
    likes: 0,
    comments: 0,
    createdAt: new Date(),
  };

  posts[id] = post;
  saveData();
  return post;
};

export const getPosts = (): Post[] => {
  return Object.values(posts)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(post => ({
      ...post,
      author: users[post.authorId]
    }));
};

export const getPostsByUser = (userId: string): Post[] => {
  return Object.values(posts)
    .filter(post => post.authorId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(post => ({
      ...post,
      author: users[post.authorId]
    }));
};

export const likePost = (postId: string): Post => {
  posts[postId].likes += 1;
  saveData();
  return posts[postId];
};

// Comment operations
export const createComment = (content: string, authorId: string, postId: string): Comment => {
  const id = uuidv4();
  const comment: Comment = {
    id,
    content,
    authorId,
    postId,
    createdAt: new Date(),
  };

  comments[id] = comment;
  posts[postId].comments += 1;
  saveData();
  return comment;
};

export const getCommentsByPost = (postId: string): Comment[] => {
  return Object.values(comments)
    .filter(comment => comment.postId === postId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .map(comment => ({
      ...comment,
      author: users[comment.authorId]
    }));
};
