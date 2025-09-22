export const postTypeOptions = [
  { value: "TEXT", label: "Metin" },
  { value: "IMAGE", label: "Görsel" },
  { value: "VIDEO", label: "Video" },
  { value: "GALLERY", label: "Galeri" },
  { value: "LINK", label: "Link" },
  { value: "EVENT", label: "Etkinlik" },
  { value: "ANNOUNCEMENT", label: "Duyuru" },
  { value: "NEWS", label: "Haber" },
  { value: "ACHIEVEMENT", label: "Başarı" },
  { value: "CELEBRATION", label: "Kutlama" },
  { value: "POLL", label: "Anket" },
  { value: "QUOTE", label: "Alıntı" },
  { value: "TESTIMONIAL", label: "Görüş" },
  { value: "BEHIND_SCENES", label: "Kuliste" },
  { value: "LIVE_STREAM", label: "Canlı Yayın" },
];

export const postStatusOptions = [
  { value: "DRAFT", label: "Taslak" },
  { value: "SCHEDULED", label: "Zamanlanmış" },
  { value: "PUBLISHED", label: "Yayınlandı" },
  { value: "ARCHIVED", label: "Arşivlendi" },
  { value: "DELETED", label: "Silindi" },
  { value: "MODERATION", label: "Moderasyonda" },
  { value: "REJECTED", label: "Reddedildi" },
  { value: "EXPIRED", label: "Süresi Doldu" },
];

export const sortOptions = [
  { value: "publishedAt", label: "Yayın Tarihi" },
  { value: "likeCount", label: "Beğeni Sayısı" },
  { value: "viewCount", label: "Görüntülenme Sayısı" },
  { value: "commentCount", label: "Yorum Sayısı" },
  { value: "shareCount", label: "Paylaşım Sayısı" },
  { value: "engagementScore", label: "Etkileşim Skoru" },
];

export const sortOrderOptions = [
  { value: "desc", label: "Azalan" },
  { value: "asc", label: "Artan" },
];
