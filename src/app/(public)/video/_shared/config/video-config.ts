/**
 * Video sayfası yapılandırma dosyası
 */

// Video URL - Buradan kolayca değiştirilebilir
export const VIDEO_CONFIG = {
  // YouTube video için:
  // url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",

  // Public klasöründen tanıtım videosu
  url: "/assets/video/tanitim_video.mp4",

  // Video bilgileri
  publishDate: "11 Ara 2025",
} as const;

// Video istatistikleri
export const VIDEO_STATS = [
  {
    icon: "ph-map-pin",
    value: "81 İl",
    label: "Hizmet Ağı",
    color: "main",
  },
  {
    icon: "ph-shield-check",
    value: "KVKK",
    label: "Uyumlu",
    color: "main-two",
  },
  {
    icon: "ph-clock",
    value: "7/24",
    label: "Teknik Destek",
    color: "success",
  },
  {
    icon: "ph-devices",
    value: "Bulut",
    label: "Altyapı",
    color: "info",
  },
] as const;

// Platform özellikleri
export const PLATFORM_FEATURES = [
  {
    icon: "ph-magnifying-glass",
    title: "Detaylı Raporlama",
    description: "Kayıt, tahsilat ve memnuniyet oranlarınızı anlık takip edin",
  },
  {
    icon: "ph-scales",
    title: "Rakip Analizi",
    description:
      "Bölgenizdeki diğer kurumlarla fiyat ve hizmet karşılaştırması yapın",
  },
  {
    icon: "ph-calendar-check",
    title: "Randevu Yönetimi",
    description:
      "Veli görüşmelerini ve tanıtım günlerini dijital ortamda yönetin",
  },
  {
    icon: "ph-star",
    title: "İtibar Yönetimi",
    description: "Kurumunuz hakkındaki yorumları yönetin ve yanıtlayın",
  },
  {
    icon: "ph-bookmark-simple",
    title: "Öğrenci CRM",
    description: "Aday öğrenci havuzunuzu yönetin ve kayıta dönüştürün",
  },
  {
    icon: "ph-device-mobile",
    title: "Mobil Yönetim",
    description:
      "Yönetici paneline mobilden erişerek işinizi her yerden yönetin",
  },
] as const;
