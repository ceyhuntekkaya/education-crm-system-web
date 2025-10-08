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

// Social Media column handlers
export interface SocialMediaColumnHandlers {
  onViewDetails?: (post: PostDto) => void;
  onEdit?: (post: PostDto) => void;
  onToggleStatus?: (post: PostDto) => void;
  onDelete?: (post: PostDto) => void;
  onDuplicate?: (post: PostDto) => void;
  onViewPost?: (post: PostDto) => void;
  onPin?: (post: PostDto) => void;
  onFeature?: (post: PostDto) => void;
}

// Social Media action buttons props
export interface SocialMediaActionButtonsProps {
  post: PostDto;
  onViewDetails?: (post: PostDto) => void;
  onEdit?: (post: PostDto) => void;
  onToggleStatus?: (post: PostDto) => void;
  onDelete?: (post: PostDto) => void;
  onDuplicate?: (post: PostDto) => void;
  onViewPost?: (post: PostDto) => void;
  onPin?: (post: PostDto) => void;
  onFeature?: (post: PostDto) => void;
}

// Social Media table props
export interface SocialMediaTableProps {
  posts?: PostDto[];
  loading?: boolean;
}

// Social Media context type
export interface SocialMediaContextType {
  posts: PostDto[];
  loading: boolean;
  selectedPost: PostDto | null;
  setSelectedPost: (post: PostDto | null) => void;
  refreshPosts: () => void;
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
