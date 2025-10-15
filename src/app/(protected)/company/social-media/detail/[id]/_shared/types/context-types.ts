import { PostDto } from "@/types";

export interface PostDetailContextValue {
  postId: number;
  post: PostDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface PostDetailProviderProps {
  children: React.ReactNode;
  postId: number;
}
