// Post utility functions

export const getPostTypeIcon = (postType?: string): string => {
  switch (postType) {
    case "TEXT":
      return "ph ph-text-aa";
    case "IMAGE":
      return "ph ph-image";
    case "VIDEO":
      return "ph ph-video";
    case "GALLERY":
      return "ph ph-images";
    case "LINK":
      return "ph ph-link";
    case "EVENT":
      return "ph ph-calendar-check";
    case "ANNOUNCEMENT":
      return "ph ph-megaphone";
    case "NEWS":
      return "ph ph-newspaper";
    case "ACHIEVEMENT":
      return "ph ph-trophy";
    case "CELEBRATION":
      return "ph ph-confetti";
    case "POLL":
      return "ph ph-chart-bar";
    case "QUOTE":
      return "ph ph-quotes";
    case "TESTIMONIAL":
      return "ph ph-user-circle";
    case "BEHIND_SCENES":
      return "ph ph-camera";
    case "LIVE_STREAM":
      return "ph ph-broadcast";
    default:
      return "ph ph-file-text";
  }
};

export const formatPostType = (postType?: string): string => {
  switch (postType) {
    case "TEXT":
      return "Metin";
    case "IMAGE":
      return "Görsel";
    case "VIDEO":
      return "Video";
    case "GALLERY":
      return "Galeri";
    case "LINK":
      return "Link";
    case "EVENT":
      return "Etkinlik";
    case "ANNOUNCEMENT":
      return "Duyuru";
    case "NEWS":
      return "Haber";
    case "ACHIEVEMENT":
      return "Başarı";
    case "CELEBRATION":
      return "Kutlama";
    case "POLL":
      return "Anket";
    case "QUOTE":
      return "Alıntı";
    case "TESTIMONIAL":
      return "Görüş";
    case "BEHIND_SCENES":
      return "Kuliste";
    case "LIVE_STREAM":
      return "Canlı Yayın";
    default:
      return "Gönderi";
  }
};

export const formatViewCount = (count?: number): string => {
  if (!count) return "0";

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const formatEngagementCount = (count?: number): string => {
  if (!count) return "0";

  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  } else if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

export const formatDate = (dateString?: string): string => {
  if (!dateString) return "";

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
      return `${diffInMinutes} dakika önce`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} saat önce`;
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)} gün önce`;
    } else {
      return date.toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }
  } catch (error) {
    return "";
  }
};

export const formatStatusBadge = (status?: string): string => {
  switch (status) {
    case "DRAFT":
      return "Taslak";
    case "SCHEDULED":
      return "Zamanlanmış";
    case "PUBLISHED":
      return "Yayınlandı";
    case "ARCHIVED":
      return "Arşivlendi";
    case "DELETED":
      return "Silindi";
    case "MODERATION":
      return "Moderasyonda";
    case "REJECTED":
      return "Reddedildi";
    case "EXPIRED":
      return "Süresi Doldu";
    default:
      return status || "";
  }
};

export const getPostTypeColor = (postType?: string): string => {
  switch (postType) {
    case "ANNOUNCEMENT":
      return "warning";
    case "NEWS":
      return "info";
    case "ACHIEVEMENT":
      return "success";
    case "EVENT":
      return "primary";
    case "CELEBRATION":
      return "success";
    default:
      return "neutral";
  }
};

export const getStatusColor = (status?: string): string => {
  switch (status) {
    case "PUBLISHED":
      return "success";
    case "DRAFT":
      return "neutral";
    case "SCHEDULED":
      return "info";
    case "MODERATION":
      return "warning";
    case "REJECTED":
      return "danger";
    case "EXPIRED":
      return "neutral";
    default:
      return "neutral";
  }
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const stripHtmlTags = (html: string): string => {
  return html.replace(/<[^>]*>/g, "");
};

export const extractHashtags = (text: string): string[] => {
  const hashtagRegex = /#[\w\u00c0-\u024f\u1e00-\u1eff]+/gi;
  return text.match(hashtagRegex) || [];
};

export const highlightHashtags = (text: string): string => {
  const hashtagRegex = /#([\w\u00c0-\u024f\u1e00-\u1eff]+)/gi;
  return text.replace(hashtagRegex, '<span class="hashtag">#$1</span>');
};
