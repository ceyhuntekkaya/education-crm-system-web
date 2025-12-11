/**
 * Hakkımızda sayfası istatistikleri
 */

export interface AboutStat {
  icon: string;
  value: string;
  label: string;
  color: "main" | "main-two" | "success" | "info";
}

export const ABOUT_STATS: AboutStat[] = [
  {
    icon: "ph-buildings",
    value: "Türkiye Geneli",
    label: "Hizmet Ağı",
    color: "main",
  },
  {
    icon: "ph-shield-check",
    value: "Güvenli",
    label: "Platform",
    color: "main-two",
  },
  {
    icon: "ph-clock",
    value: "7/24",
    label: "Destek",
    color: "success",
  },
  {
    icon: "ph-devices",
    value: "Her Yerden",
    label: "Erişim",
    color: "info",
  },
];

export const PLATFORM_VALUES = [
  {
    icon: "ph-shield-check",
    title: "Güvenilirlik",
    description: "Verileriniz en yüksek güvenlik standartlarıyla korunur",
    color: "success",
  },
  {
    icon: "ph-rocket-launch",
    title: "İnovasyon",
    description: "Sürekli gelişen teknoloji ile her zaman güncel kalın",
    color: "main",
  },
  {
    icon: "ph-handshake",
    title: "Müşteri Odaklı",
    description: "İhtiyaçlarınızı dinliyor ve en iyi çözümleri sunuyoruz",
    color: "info",
  },
  {
    icon: "ph-medal",
    title: "Kalite",
    description: "En yüksek standartlarda hizmet kalitesi",
    color: "warning",
  },
];

