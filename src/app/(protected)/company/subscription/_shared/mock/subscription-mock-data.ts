import { SubscriptionPlanDto } from "@/types/dto/subscription/SubscriptionPlanDto";
import { 
  getStatusBadgeVariant,
  getBillingPeriodDisplay,
  formatPrice,
  calculateSubscriptionStats
} from "../utils/subscription-utils";

// Mock Subscription Plans Data - Based on SubscriptionPlanDto
export const mockSubscriptions: SubscriptionPlanDto[] = [
  {
    id: 1,
    name: "basic",
    displayName: "Temel Plan",
    description: "Küçük eğitim kurumları için ideal başlangıç paketi. Temel özellikler ve sınırlı kullanım ile uygun fiyatlı çözüm.",
    price: 299,
    billingPeriod: "MONTHLY",
    trialDays: 14,
    maxSchools: 1,
    maxUsers: 10,
    maxAppointmentsPerMonth: 50,
    maxGalleryItems: 100,
    maxPostsPerMonth: 20,
    hasAnalytics: false,
    hasCustomDomain: false,
    hasApiAccess: false,
    hasPrioritySupport: false,
    hasWhiteLabel: false,
    storageGb: 5,
    isPopular: false,
    sortOrder: 1,
    isVisible: true,
    pricingTiers: JSON.stringify([
      { period: "monthly", price: 299 },
      { period: "yearly", price: 2990, discount: 17 }
    ]),
    features: JSON.stringify([
      "1 Okul Yönetimi",
      "10 Kullanıcı",
      "Aylık 50 Randevu",
      "100 Galeri Öğesi",
      "Aylık 20 Gönderi",
      "5 GB Depolama",
      "E-posta Desteği"
    ]),
    isActive: true,
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: 2,
    name: "professional",
    displayName: "Profesyonel Plan",
    description: "Orta ölçekli eğitim kurumları için gelişmiş özellikler. Analitik raporlar ve öncelikli destek dahil.",
    price: 599,
    billingPeriod: "MONTHLY",
    trialDays: 30,
    maxSchools: 3,
    maxUsers: 50,
    maxAppointmentsPerMonth: 200,
    maxGalleryItems: 500,
    maxPostsPerMonth: 100,
    hasAnalytics: true,
    hasCustomDomain: true,
    hasApiAccess: false,
    hasPrioritySupport: true,
    hasWhiteLabel: false,
    storageGb: 25,
    isPopular: true,
    sortOrder: 2,
    isVisible: true,
    pricingTiers: JSON.stringify([
      { period: "monthly", price: 599 },
      { period: "yearly", price: 5990, discount: 17 }
    ]),
    features: JSON.stringify([
      "3 Okul Yönetimi",
      "50 Kullanıcı",
      "Aylık 200 Randevu",
      "500 Galeri Öğesi",
      "Aylık 100 Gönderi",
      "25 GB Depolama",
      "Analitik Raporlar",
      "Özel Domain",
      "Öncelikli Destek"
    ]),
    isActive: true,
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: 3,
    name: "enterprise",
    displayName: "Kurumsal Plan",
    description: "Büyük eğitim kurumları ve zincirler için tam özellikli çözüm. API erişimi ve beyaz etiket desteği.",
    price: 1299,
    billingPeriod: "MONTHLY",
    trialDays: 30,
    maxSchools: 10,
    maxUsers: 200,
    maxAppointmentsPerMonth: 1000,
    maxGalleryItems: 2000,
    maxPostsPerMonth: 500,
    hasAnalytics: true,
    hasCustomDomain: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    hasWhiteLabel: true,
    storageGb: 100,
    isPopular: false,
    sortOrder: 3,
    isVisible: true,
    pricingTiers: JSON.stringify([
      { period: "monthly", price: 1299 },
      { period: "yearly", price: 12990, discount: 17 }
    ]),
    features: JSON.stringify([
      "10 Okul Yönetimi",
      "200 Kullanıcı",
      "Aylık 1000 Randevu",
      "2000 Galeri Öğesi",
      "Aylık 500 Gönderi",
      "100 GB Depolama",
      "Gelişmiş Analitikler",
      "Özel Domain",
      "API Erişimi",
      "Beyaz Etiket",
      "7/24 Destek"
    ]),
    isActive: true,
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: 4,
    name: "starter",
    displayName: "Başlangıç Paketi",
    description: "Yeni başlayan küçük eğitim kurumları için ücretsiz deneme paketi. Sınırlı özellikler ile test edebilirsiniz.",
    price: 0,
    billingPeriod: "MONTHLY",
    trialDays: 30,
    maxSchools: 1,
    maxUsers: 3,
    maxAppointmentsPerMonth: 10,
    maxGalleryItems: 20,
    maxPostsPerMonth: 5,
    hasAnalytics: false,
    hasCustomDomain: false,
    hasApiAccess: false,
    hasPrioritySupport: false,
    hasWhiteLabel: false,
    storageGb: 1,
    isPopular: false,
    sortOrder: 0,
    isVisible: true,
    pricingTiers: JSON.stringify([
      { period: "monthly", price: 0 }
    ]),
    features: JSON.stringify([
      "1 Okul Yönetimi",
      "3 Kullanıcı",
      "Aylık 10 Randevu",
      "20 Galeri Öğesi",
      "Aylık 5 Gönderi",
      "1 GB Depolama",
      "Temel Destek"
    ]),
    isActive: true,
    createdAt: "2024-01-15T09:00:00Z",
  },
  {
    id: 5,
    name: "premium",
    displayName: "Premium Plan",
    description: "Profesyonel planın gelişmiş versiyonu. Daha fazla okul ve kullanıcı kapasitesi ile büyüyen kurumlar için.",
    price: 899,
    billingPeriod: "MONTHLY",
    trialDays: 30,
    maxSchools: 5,
    maxUsers: 100,
    maxAppointmentsPerMonth: 500,
    maxGalleryItems: 1000,
    maxPostsPerMonth: 250,
    hasAnalytics: true,
    hasCustomDomain: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    hasWhiteLabel: false,
    storageGb: 50,
    isPopular: false,
    sortOrder: 4,
    isVisible: true,
    pricingTiers: JSON.stringify([
      { period: "monthly", price: 899 },
      { period: "yearly", price: 8990, discount: 17 }
    ]),
    features: JSON.stringify([
      "5 Okul Yönetimi",
      "100 Kullanıcı",
      "Aylık 500 Randevu",
      "1000 Galeri Öğesi",
      "Aylık 250 Gönderi",
      "50 GB Depolama",
      "Gelişmiş Analitikler",
      "Özel Domain",
      "API Erişimi",
      "Öncelikli Destek"
    ]),
    isActive: true,
    createdAt: "2024-01-20T10:30:00Z",
  },
  {
    id: 6,
    name: "annual_basic",
    displayName: "Yıllık Temel Plan",
    description: "Temel planın yıllık versiyonu. %20 indirim ile daha ekonomik çözüm.",
    price: 2390,
    billingPeriod: "YEARLY",
    trialDays: 14,
    maxSchools: 1,
    maxUsers: 10,
    maxAppointmentsPerMonth: 50,
    maxGalleryItems: 100,
    maxPostsPerMonth: 20,
    hasAnalytics: false,
    hasCustomDomain: false,
    hasApiAccess: false,
    hasPrioritySupport: false,
    hasWhiteLabel: false,
    storageGb: 5,
    isPopular: false,
    sortOrder: 5,
    isVisible: true,
    pricingTiers: JSON.stringify([
      { period: "yearly", price: 2390, originalPrice: 2988, discount: 20 }
    ]),
    features: JSON.stringify([
      "1 Okul Yönetimi",
      "10 Kullanıcı",
      "Aylık 50 Randevu",
      "100 Galeri Öğesi",
      "Aylık 20 Gönderi",
      "5 GB Depolama",
      "E-posta Desteği",
      "%20 Yıllık İndirim"
    ]),
    isActive: true,
    createdAt: "2024-01-25T14:15:00Z",
  },
  {
    id: 7,
    name: "custom_enterprise",
    displayName: "Özel Kurumsal Çözüm",
    description: "Büyük eğitim kurumları için özelleştirilmiş çözüm. Sınırsız kullanım ve özel geliştirmeler dahil.",
    price: 2999,
    billingPeriod: "MONTHLY",
    trialDays: 60,
    maxSchools: 999,
    maxUsers: 999,
    maxAppointmentsPerMonth: 9999,
    maxGalleryItems: 9999,
    maxPostsPerMonth: 9999,
    hasAnalytics: true,
    hasCustomDomain: true,
    hasApiAccess: true,
    hasPrioritySupport: true,
    hasWhiteLabel: true,
    storageGb: 500,
    isPopular: false,
    sortOrder: 6,
    isVisible: false, // Özel plan, genel listede görünmez
    pricingTiers: JSON.stringify([
      { period: "monthly", price: 2999 },
      { period: "yearly", price: 29990, discount: 17 }
    ]),
    features: JSON.stringify([
      "Sınırsız Okul",
      "Sınırsız Kullanıcı",
      "Sınırsız Randevu",
      "Sınırsız Galeri",
      "Sınırsız Gönderi",
      "500 GB Depolama",
      "Özel Geliştirmeler",
      "Dedike Destek",
      "Özel Entegrasyonlar",
      "SLA Garantisi"
    ]),
    isActive: true,
    createdAt: "2024-02-01T16:45:00Z",
  },
  {
    id: 8,
    name: "education_special",
    displayName: "Eğitim Özel Paketi",
    description: "Devlet okulları ve kar amacı gütmeyen eğitim kurumları için özel indirimli paket.",
    price: 199,
    billingPeriod: "MONTHLY",
    trialDays: 60,
    maxSchools: 2,
    maxUsers: 25,
    maxAppointmentsPerMonth: 100,
    maxGalleryItems: 250,
    maxPostsPerMonth: 50,
    hasAnalytics: true,
    hasCustomDomain: false,
    hasApiAccess: false,
    hasPrioritySupport: true,
    hasWhiteLabel: false,
    storageGb: 15,
    isPopular: false,
    sortOrder: 7,
    isVisible: true,
    pricingTiers: JSON.stringify([
      { period: "monthly", price: 199 },
      { period: "yearly", price: 1990, discount: 17 }
    ]),
    features: JSON.stringify([
      "2 Okul Yönetimi",
      "25 Kullanıcı",
      "Aylık 100 Randevu",
      "250 Galeri Öğesi",
      "Aylık 50 Gönderi",
      "15 GB Depolama",
      "Analitik Raporlar",
      "Öncelikli Destek",
      "Eğitim İndirimi"
    ]),
    isActive: true,
    createdAt: "2024-02-10T11:20:00Z",
  },
  {
    id: 9,
    name: "legacy_plan",
    displayName: "Eski Plan",
    description: "Artık satışta olmayan eski plan. Mevcut müşteriler için korunuyor.",
    price: 399,
    billingPeriod: "MONTHLY",
    trialDays: 0,
    maxSchools: 2,
    maxUsers: 20,
    maxAppointmentsPerMonth: 75,
    maxGalleryItems: 150,
    maxPostsPerMonth: 30,
    hasAnalytics: false,
    hasCustomDomain: true,
    hasApiAccess: false,
    hasPrioritySupport: false,
    hasWhiteLabel: false,
    storageGb: 10,
    isPopular: false,
    sortOrder: 99,
    isVisible: false, // Artık görünmez
    pricingTiers: JSON.stringify([
      { period: "monthly", price: 399 }
    ]),
    features: JSON.stringify([
      "2 Okul Yönetimi",
      "20 Kullanıcı",
      "Aylık 75 Randevu",
      "150 Galeri Öğesi",
      "Aylık 30 Gönderi",
      "10 GB Depolama",
      "Özel Domain"
    ]),
    isActive: false, // Pasif plan
    createdAt: "2023-12-01T08:00:00Z",
  },
];

// Utility functions for working with mock data
export const getSubscriptionsByBillingPeriod = (billingPeriod: string): SubscriptionPlanDto[] => {
  return mockSubscriptions.filter(sub => sub.billingPeriod === billingPeriod);
};

export const getActiveSubscriptions = (): SubscriptionPlanDto[] => {
  return mockSubscriptions.filter(sub => sub.isActive);
};

export const getVisibleSubscriptions = (): SubscriptionPlanDto[] => {
  return mockSubscriptions.filter(sub => sub.isVisible);
};

export const getPopularSubscriptions = (): SubscriptionPlanDto[] => {
  return mockSubscriptions.filter(sub => sub.isPopular);
};

export const getSubscriptionsByPriceRange = (minPrice: number, maxPrice: number): SubscriptionPlanDto[] => {
  return mockSubscriptions.filter(sub => 
    (sub.price || 0) >= minPrice && (sub.price || 0) <= maxPrice
  );
};

export const getFreeSubscriptions = (): SubscriptionPlanDto[] => {
  return mockSubscriptions.filter(sub => (sub.price || 0) === 0);
};

export const getSubscriptionById = (id: number): SubscriptionPlanDto | undefined => {
  return mockSubscriptions.find(sub => sub.id === id);
};

export const getSubscriptionsByFeature = (feature: string): SubscriptionPlanDto[] => {
  return mockSubscriptions.filter(sub => {
    if (feature === "analytics") return sub.hasAnalytics;
    if (feature === "customDomain") return sub.hasCustomDomain;
    if (feature === "apiAccess") return sub.hasApiAccess;
    if (feature === "prioritySupport") return sub.hasPrioritySupport;
    if (feature === "whiteLabel") return sub.hasWhiteLabel;
    return false;
  });
};

export const getMostPopularPlan = (): SubscriptionPlanDto | undefined => {
  return mockSubscriptions.find(sub => sub.isPopular && sub.isActive && sub.isVisible);
};

// Re-export utility functions that work with mock data
export {
  getStatusBadgeVariant,
  getBillingPeriodDisplay,
  formatPrice,
  calculateSubscriptionStats
};
