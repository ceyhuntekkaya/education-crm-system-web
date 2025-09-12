// Empty state configurations
export const EMPTY_STATE_CONFIG = {
  all: {
    icon: "ph-list",
    title: "Kampanya Bulunmuyor",
    description:
      "Bu kurum için şu anda herhangi bir kampanya bulunmamaktadır. Yeni kampanyalar için takipte kalın.",
  },
  active: {
    icon: "ph-tag",
    title: "Aktif Kampanya Bulunmuyor",
    description:
      "Şu anda bu kurum için aktif bir kampanya bulunmamaktadır. Yakında yeni fırsatlar için takipte kalın.",
  },
  inactive: {
    icon: "ph-clock",
    title: "Geçmiş Kampanya Bulunmuyor",
    description: "Bu kurum için daha önce yapılmış kampanya bulunmamaktadır.",
  },
} as const;
