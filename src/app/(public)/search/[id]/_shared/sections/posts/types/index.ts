import { PostDto, PostSummaryDto } from "@/types/dto/content";

export interface PostProps {
  institutionId: string;
}

export interface PostCardProps {
  post: PostSummaryDto;
  onCardClick?: (postId: number) => void;
}

export interface PostHeaderProps {
  title: string;
  count: number;
}

export interface PostStatsProps {
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  shareCount?: number;
}

export interface PostBadgeProps {
  postType?: string;
  status?: string;
  isFeatured?: boolean;
  isPinned?: boolean;
}

export interface PostEmptyStateProps {
  title?: string;
  description?: string;
}

export interface PostFooterProps {
  postCount: number;
  onViewAllClick?: () => void;
}

export interface PostDetailProps {
  post: PostDto;
}

export interface PostContentProps {
  content?: string;
  postType?: string;
  featuredImageUrl?: string;
  videoUrl?: string;
  mediaAttachments?: string;
}

export interface PostMetaProps {
  publishedAt?: string;
  authorName?: string;
  schoolName?: string;
  hashtags?: string;
  tags?: string;
}

export interface PostEngagementProps {
  likeCount?: number;
  commentCount?: number;
  viewCount?: number;
  shareCount?: number;
  allowComments?: boolean;
  allowLikes?: boolean;
}
