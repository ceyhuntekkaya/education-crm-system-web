import { PostDto } from "@/types";

/**
 * API'den gelen Post verisini form verilerine dönüştürür
 * @param post API'den gelen post verisi
 * @returns Form için hazırlanmış veri
 */
export const transformPostToFormData = (post: PostDto | null): any => {
  if (!post) return null;

  // Items'ı backend formatından form formatına dönüştür
  const transformedItems = post.items
    ? post.items.map((item) => ({
        id: item.id, // Mevcut item'ların ID'sini sakla
        itemType: item.itemType,
        fileUrl: item.fileUrl,
        fileName: item.fileName,
        sortOrder: item.sortOrder,
      }))
    : [];

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

    // Items (media attachments)
    items: transformedItems,
  };
};
