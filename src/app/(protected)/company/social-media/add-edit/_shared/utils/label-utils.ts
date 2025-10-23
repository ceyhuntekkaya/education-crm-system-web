import { PostType, PostStatus } from "@/enums";

/**
 * PostType enum değeri için Türkçe label döndürür
 */
export function getPostTypeLabel(type: PostType): string {
  const labels: Record<PostType, string> = {
    [PostType.TEXT]: "Metin",
    [PostType.IMAGE]: "Resim",
    [PostType.VIDEO]: "Video",
    [PostType.GALLERY]: "Galeri",
    [PostType.LINK]: "Bağlantı",
    [PostType.EVENT]: "Etkinlik",
    [PostType.ANNOUNCEMENT]: "Duyuru",
    [PostType.NEWS]: "Haber",
    [PostType.ACHIEVEMENT]: "Başarı",
    [PostType.CELEBRATION]: "Kutlama",
    [PostType.POLL]: "Anket",
    [PostType.QUOTE]: "Alıntı",
    [PostType.TESTIMONIAL]: "Referans",
    [PostType.BEHIND_SCENES]: "Kuliste",
    [PostType.LIVE_STREAM]: "Canlı Yayın",
  };
  return labels[type] || type;
}

/**
 * PostStatus enum değeri için Türkçe label döndürür
 */
export function getPostStatusLabel(status: PostStatus): string {
  const labels: Record<PostStatus, string> = {
    [PostStatus.DRAFT]: "Taslak",
    [PostStatus.SCHEDULED]: "Zamanlanmış",
    [PostStatus.PUBLISHED]: "Yayınlanmış",
    [PostStatus.ARCHIVED]: "Arşivlenmiş",
    [PostStatus.DELETED]: "Silinmiş",
    [PostStatus.MODERATION]: "Moderasyonda",
    [PostStatus.REJECTED]: "Reddedilmiş",
    [PostStatus.EXPIRED]: "Süresi Dolmuş",
  };
  return labels[status] || status;
}
