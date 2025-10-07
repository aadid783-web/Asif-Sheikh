
export interface User {
  id: string;
  username: string;
  avatarUrl: string;
}

export interface Story {
  id: string;
  user: User;
  imageUrl: string;
}

export interface Post {
  id: string;
  user: User;
  imageUrl: string;
  caption: string;
  likes: number;
  comments: number;
}
