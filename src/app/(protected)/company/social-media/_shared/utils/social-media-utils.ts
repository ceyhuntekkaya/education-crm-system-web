import { PostDto } from "@/types/dto/content/PostDto";
import { BadgeVariant, SocialMediaStats } from "../types";

// Status badge variant mapping
export const getStatusBadgeVariant = (status: string): BadgeVariant => {
  const statusMap: Record<string, BadgeVariant> = {
    PUBLISHED: "success",
    DRAFT: "secondary",
    SCHEDULED: "warning",
    ARCHIVED: "light",
    DELETED: "danger",
  };
  return statusMap[status] || "secondary";
};

// Post type display mapping
export const getPostTypeDisplay = (postType: string): string => {
  const typeMap: Record<string, string> = {
    ANNOUNCEMENT: "Duyuru",
    NEWS: "Haber",
    EVENT: "Etkinlik",
    ACHIEVEMENT: "Başarı",
    BEHIND_SCENES: "Kamera Arkası",
    CELEBRATION: "Kutlama",
    TEXT: "Metin",
    GALLERY: "Galeri",
    VIDEO: "Video",
    POLL: "Anket",
    LIVE: "Canlı Yayın",
    STORY: "Hikaye",
  };
  return typeMap[postType] || postType;
};

// Post status display mapping
export const getPostStatusDisplay = (status: string): string => {
  const statusMap: Record<string, string> = {
    PUBLISHED: "Yayınlandı",
    DRAFT: "Taslak",
    SCHEDULED: "Zamanlandı",
    ARCHIVED: "Arşivlendi",
    DELETED: "Silindi",
  };
  return statusMap[status] || status;
};

// Format engagement score
export const formatEngagement = (score: number): string => {
  return `${score.toFixed(1)}/10`;
};

// Format numbers with thousand separators
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("tr-TR").format(num);
};

// Calculate engagement rate
export const calculateEngagementRate = (post: PostDto): number => {
  const totalEngagements =
    (post.likeCount || 0) + (post.commentCount || 0) + (post.shareCount || 0);
  const views = post.viewCount || 1;
  return (totalEngagements / views) * 100;
};

// Calculate social media statistics
export const calculatePostStats = (posts: PostDto[]): SocialMediaStats => {
  const stats: SocialMediaStats = {
    totalPosts: posts.length,
    publishedPosts: posts.filter((p) => p.status === "PUBLISHED").length,
    totalViews: posts.reduce((sum, p) => sum + (p.viewCount || 0), 0),
    totalLikes: posts.reduce((sum, p) => sum + (p.likeCount || 0), 0),
    totalComments: posts.reduce((sum, p) => sum + (p.commentCount || 0), 0),
    totalShares: posts.reduce((sum, p) => sum + (p.shareCount || 0), 0),
    featuredPosts: posts.filter((p) => p.isFeatured).length,
    pinnedPosts: posts.filter((p) => p.isPinned).length,
    averageEngagement:
      posts.reduce((sum, p) => sum + (p.engagementScore || 0), 0) /
      posts.length,
  };

  return stats;
};

// Get post reach display
export const getPostReachDisplay = (post: PostDto): string => {
  if (post.reachCount) {
    return formatNumber(post.reachCount);
  }
  return "-";
};

// Get post impressions display
export const getPostImpressionsDisplay = (post: PostDto): string => {
  if (post.impressionCount) {
    return formatNumber(post.impressionCount);
  }
  return "-";
};

// Check if post is scheduled
export const isPostScheduled = (post: PostDto): boolean => {
  return post.status === "SCHEDULED" && !!post.scheduledAt;
};

// Check if post is pinned and not expired
export const isPostPinnedAndActive = (post: PostDto): boolean => {
  if (!post.isPinned) return false;
  if (!post.pinExpiresAt) return true;
  return new Date(post.pinExpiresAt) > new Date();
};

// Get post URL slug
export const getPostUrl = (post: PostDto): string => {
  return `/posts/${post.slug}`;
};

// Get post media type
export const getPostMediaType = (post: PostDto): string => {
  if (post.videoUrl) return "Video";
  if (post.mediaAttachments) {
    try {
      const attachments = JSON.parse(post.mediaAttachments);
      if (attachments.length > 0) return "Medya";
    } catch (e) {
      // Invalid JSON
    }
  }
  if (post.featuredImageUrl) return "Resim";
  return "Metin";
};

// Sort posts by different criteria
export const sortPosts = (
  posts: PostDto[],
  sortBy:
    | "title"
    | "createdAt"
    | "publishedAt"
    | "viewCount"
    | "likeCount"
    | "engagementScore",
  order: "asc" | "desc" = "desc"
): PostDto[] => {
  return [...posts].sort((a, b) => {
    let aValue: any;
    let bValue: any;

    switch (sortBy) {
      case "title":
        aValue = (a.title || "").toLowerCase();
        bValue = (b.title || "").toLowerCase();
        break;
      case "createdAt":
        aValue = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        bValue = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        break;
      case "publishedAt":
        aValue = a.publishedAt ? new Date(a.publishedAt).getTime() : 0;
        bValue = b.publishedAt ? new Date(b.publishedAt).getTime() : 0;
        break;
      case "viewCount":
        aValue = a.viewCount || 0;
        bValue = b.viewCount || 0;
        break;
      case "likeCount":
        aValue = a.likeCount || 0;
        bValue = b.likeCount || 0;
        break;
      case "engagementScore":
        aValue = a.engagementScore || 0;
        bValue = b.engagementScore || 0;
        break;
      default:
        return 0;
    }

    if (order === "asc") {
      return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
    } else {
      return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
    }
  });
};

// Get time ago display
export const getTimeAgo = (date: string): string => {
  if (!date) return "-";

  const now = new Date();
  const postDate = new Date(date);

  // Geçersiz tarih kontrolü
  if (isNaN(postDate.getTime())) return "-";

  const diffInSeconds = Math.floor((now.getTime() - postDate.getTime()) / 1000);

  // Negatif değer kontrolü (gelecekteki tarih)
  if (diffInSeconds < 0) return "Gelecek tarih";

  if (diffInSeconds < 60) return "Az önce";
  if (diffInSeconds < 3600)
    return `${Math.floor(diffInSeconds / 60)} dakika önce`;
  if (diffInSeconds < 86400)
    return `${Math.floor(diffInSeconds / 3600)} saat önce`;
  if (diffInSeconds < 604800)
    return `${Math.floor(diffInSeconds / 86400)} gün önce`; // 7 gün
  if (diffInSeconds < 2629746)
    return `${Math.floor(diffInSeconds / 604800)} hafta önce`; // 1 ay
  if (diffInSeconds < 31556952)
    return `${Math.floor(diffInSeconds / 2629746)} ay önce`; // 1 yıl

  return `${Math.floor(diffInSeconds / 31556952)} yıl önce`;
};
