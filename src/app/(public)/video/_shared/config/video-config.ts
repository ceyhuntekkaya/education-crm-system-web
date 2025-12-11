/**
 * Video sayfası yapılandırma dosyası
 */

// Video URL - Buradan kolayca değiştirilebilir
export const VIDEO_CONFIG = {
  // YouTube video için:
  // url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  
  // Direkt video için:
  url: "https://demo.designexium.co.uk/api/upload/serve/5/items/40bb5f65-6f28-4701-a152-e6f612f965cf_istockphoto-481413373-640_adpp_is_-_Kopya.mp4",
  
  // Video bilgileri
  publishDate: "11 Ara 2025",
  viewCount: "1,250+",
} as const;

// Video istatistikleri
export const VIDEO_STATS = [
  {
    icon: "ph-users-three",
    value: "10,000+",
    label: "Aktif Kullanıcı",
    color: "main",
  },
  {
    icon: "ph-buildings",
    value: "500+",
    label: "Eğitim Kurumu",
    color: "main-two",
  },
  {
    icon: "ph-chart-line-up",
    value: "%100",
    label: "Memnuniyet",
    color: "success",
  },
  {
    icon: "ph-clock",
    value: "7/24",
    label: "Destek",
    color: "info",
  },
] as const;

// Platform özellikleri
export const PLATFORM_FEATURES = [
  {
    icon: "ph-magnifying-glass",
    title: "Gelişmiş Arama",
    description: "İhtiyaçlarınıza uygun eğitim kurumlarını kolayca bulun",
  },
  {
    icon: "ph-scales",
    title: "Kurum Karşılaştırma",
    description: "Eğitim kurumlarını yan yana getirip detaylı karşılaştırın",
  },
  {
    icon: "ph-calendar-check",
    title: "Randevu Sistemi",
    description: "Kurumlarla hızlıca iletişime geçin ve randevu alın",
  },
  {
    icon: "ph-star",
    title: "Değerlendirme",
    description: "Gerçek kullanıcı deneyimlerini okuyun ve karar verin",
  },
  {
    icon: "ph-bookmark-simple",
    title: "Liste Yönetimi",
    description: "Beğendiğiniz kurumları listelerinize kaydedin",
  },
  {
    icon: "ph-device-mobile",
    title: "Mobil Uyumlu",
    description: "Her yerden, her cihazdan kolayca erişim sağlayın",
  },
] as const;

