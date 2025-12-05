export interface Advantage {
  icon: string;
  title: string;
  description: string;
  iconClass: string;
}

export const parentAdvantages: Advantage[] = [
  {
    icon: "ph-clock",
    title: "Zaman Tasarrufu",
    description:
      "Tek platformdan tüm Kurum araştırmanızı yapın, randevu alın ve karşılaştırın.",
    iconClass: "advantage-card__icon--warning",
  },
  {
    icon: "ph-device-mobile",
    title: "Her Yerden Erişim",
    description:
      "Mobil uyumlu tasarım sayesinde dilediğiniz yerden platform kullanın.",
    iconClass: "advantage-card__icon--info",
  },
  {
    icon: "ph-currency-circle-dollar",
    title: "Ücretsiz Kullanım",
    description:
      "Tüm temel özellikler ücretsiz, premium seçeneklerle daha fazlası.",
    iconClass: "advantage-card__icon--success",
  },
];

export const institutionAdvantages: Advantage[] = [
  {
    icon: "ph-chart-line",
    title: "Gelişmiş Analitik",
    description:
      "Detaylı raporlar ve metriklerle kurumunuzun performansını izleyin.",
    iconClass: "advantage-card__icon--primary",
  },
  {
    icon: "ph-lightning",
    title: "Kolay Entegrasyon",
    description:
      "Mevcut sistemlerinizle hızlı ve sorunsuz entegrasyon sağlayın.",
    iconClass: "advantage-card__icon--warning",
  },
  {
    icon: "ph-headset",
    title: "Profesyonel Destek",
    description: "7/24 teknik destek ve eğitim hizmetleriyle yanınızdayız.",
    iconClass: "advantage-card__icon--success",
  },
];
