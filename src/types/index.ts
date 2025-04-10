
export interface User {
  id: string;
  email: string;
  name: string;
  headline?: string;
  avatar?: string;
  bio?: string;
  location?: string;
  company?: string;
  position?: string;
  createdAt: Date;
}

export interface Post {
  id: string;
  content: string;
  image?: string | null;
  authorId: string;
  author?: User;
  likes: number;
  comments: number;
  createdAt: Date;
}

export interface Comment {
  id: string;
  content: string;
  authorId: string;
  author?: User;
  postId: string;
  createdAt: Date;
}
