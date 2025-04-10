
import { User, Post, Comment } from '@/types';
import { v4 as uuidv4 } from 'uuid';

// Mock users
const users: Record<string, User> = {};

// Mock posts
const posts: Record<string, Post> = {};

// Mock comments
const comments: Record<string, Comment> = {};

// Local storage keys
const USERS_KEY = 'linkedin_clone_users';
const POSTS_KEY = 'linkedin_clone_posts';
const COMMENTS_KEY = 'linkedin_clone_comments';
const CURRENT_USER_KEY = 'linkedin_clone_current_user';

// Initialize data from localStorage
export const initializeData = () => {
  const storedUsers = localStorage.getItem(USERS_KEY);
  const storedPosts = localStorage.getItem(POSTS_KEY);
  const storedComments = localStorage.getItem(COMMENTS_KEY);

  if (storedUsers) {
    Object.assign(users, JSON.parse(storedUsers));
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
export const createUser = (email: string, name: string, password: string): User => {
  const id = uuidv4();
  const user: User = {
    id,
    email,
    name,
    createdAt: new Date(),
  };

  // Store the user
  users[id] = user;
  
  // Store password separately (in a real app, this would be hashed)
  localStorage.setItem(`user_pwd_${id}`, password);
  
  saveData();
  return user;
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
