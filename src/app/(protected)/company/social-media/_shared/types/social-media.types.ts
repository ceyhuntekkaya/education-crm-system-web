import { PostDto } from "@/types/dto/content/PostDto";

// Badge variant type
export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info"
  | "light"
  | "dark";

// Social Media table props
export interface SocialMediaTableProps {
  posts?: PostDto[];
  loading?: boolean;
}

// Social Media context type
export interface SocialMediaContextType {
  // Post data
  schoolPosts: PostDto[];
  postsLoading: boolean;
  postsError: string | null;

  // Actions
  refetchPosts: () => void;
}

// Social Media stats type
export interface SocialMediaStats {
  totalPosts: number;
  publishedPosts: number;
  totalViews: number;
  totalLikes: number;
  totalComments: number;
  totalShares: number;
  featuredPosts: number;
  pinnedPosts: number;
  averageEngagement: number;
}
