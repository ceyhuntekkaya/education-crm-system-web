export interface Feature {
  icon: string;
  title: string;
  description: string;
  iconClass: string;
}

export const parentFeatures: Feature[] = [
  {
    icon: "ph-magnifying-glass",
    title: "Kurum Arama",
    description:
      "Gelişmiş filtreleme sistemi ile size en uygun eğitim kurumlarını kolayca bulun.",
    iconClass: "feature-card__icon--main",
  },
  {
    icon: "ph-calendar",
    title: "Randevu Yönetimi",
    description:
      "Online randevu alın, takip edin ve Kurum ziyaretlerinizi planlayın.",
    iconClass: "feature-card__icon--primary",
  },
  {
    icon: "ph-chat-circle-dots",
    title: "Mesajlaşma",
    description:
      "WhatsApp entegrasyonu ile Kurumlarla doğrudan ve hızlı iletişim kurun.",
    iconClass: "feature-card__icon--success",
  },
  {
    icon: "ph-star",
    title: "Favori Listeler",
    description:
      "Beğendiğiniz Kurumları kaydedin, karşılaştırın ve değerlendirin.",
    iconClass: "feature-card__icon--warning",
  },
  {
    icon: "ph-clipboard-text",
    title: "Anket & Değerlendirme",
    description:
      "Deneyimlerinizi paylaşın, diğer velilerin görüşlerini inceleyin.",
    iconClass: "feature-card__icon--info",
  },
  {
    icon: "ph-shield-check",
    title: "Güvenli Platform",
    description: "Verileriniz en yüksek güvenlik standartlarıyla korunur.",
    iconClass: "feature-card__icon--success",
  },
];

export const institutionFeatures: Feature[] = [
  {
    icon: "ph-buildings",
    title: "Kurum Yönetimi",
    description: "Tüm kampüslerinizi ve şubelerinizi tek platformdan yönetin.",
    iconClass: "feature-card__icon--main",
  },
  {
    icon: "ph-users",
    title: "Kullanıcı Yönetimi",
    description:
      "Ekip üyelerinizi, rollerini ve yetkilerini merkezi olarak kontrol edin.",
    iconClass: "feature-card__icon--primary",
  },
  {
    icon: "ph-calendar-check",
    title: "Randevu Sistemi",
    description:
      "Veli görüşmelerini ve kampüs ziyaretlerini profesyonelce organize edin.",
    iconClass: "feature-card__icon--success",
  },
  {
    icon: "ph-megaphone",
    title: "Kampanya Yönetimi",
    description:
      "İndirim kampanyaları ve pazarlama stratejilerinizi planlayın.",
    iconClass: "feature-card__icon--warning",
  },
  {
    icon: "ph-image",
    title: "Galeri & Medya",
    description:
      "Etkinlik fotoğrafları ve kurumsal görsellerinizi organize edin.",
    iconClass: "feature-card__icon--info",
  },
  {
    icon: "ph-chart-bar",
    title: "Analitik Raporlar",
    description:
      "Detaylı performans metrikleri ve istatistiklerle stratejinizi geliştirin.",
    iconClass: "feature-card__icon--danger",
  },
];
