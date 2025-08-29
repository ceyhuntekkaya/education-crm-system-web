// JSONPlaceholder API Type Definitions
// https://jsonplaceholder.typicode.com/

export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Utility types for API operations
export type CreatePost = Omit<Post, "id">;
export type UpdatePost = Partial<Post> & { id: number };
export type CreateComment = Omit<Comment, "id">;
export type CreateTodo = Omit<Todo, "id">;
export type UpdateTodo = Partial<Todo> & { id: number };
