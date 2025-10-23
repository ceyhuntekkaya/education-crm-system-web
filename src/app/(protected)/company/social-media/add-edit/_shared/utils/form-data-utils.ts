import { PostDto } from "@/types";

/**
 * API'den gelen Post verisini form verilerine dönüştürür
 * @param post API'den gelen post verisi
 * @returns Form için hazırlanmış veri
 */
export const transformPostToFormData = (post: PostDto | null): any => {
  if (!post) return null;

  return {
    title: post.title || "",
    content: post.content || "",
    postType: post.postType,
    status: post.status,
    scheduledAt: post.scheduledAt || "",
    expiresAt: post.expiresAt || "",

    // Media content
    featuredImageUrl: post.featuredImageUrl || "",
    videoUrl: post.videoUrl || "",
    videoThumbnailUrl: post.videoThumbnailUrl || "",
    mediaAttachments: post.mediaAttachments || "",

    // Settings
    allowComments: post.allowComments,
    allowLikes: post.allowLikes,
    isFeatured: post.isFeatured,
    isPinned: post.isPinned,
    pinExpiresAt: post.pinExpiresAt || "",

    // SEO
    metaTitle: post.metaTitle || "",
    metaDescription: post.metaDescription || "",
    tags: post.tags || "",
    hashtags: post.hashtags || "",

    // External links
    externalUrl: post.externalUrl || "",
    callToAction: post.callToAction || "",
    ctaUrl: post.ctaUrl || "",
  };
};
