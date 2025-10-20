import {
  SubscriptionPlanDto,
  MembershipPlan,
  MembershipFeature,
  MembershipPrice,
  MembershipLimits,
  MembershipCapabilities,
} from "../types";
import { mapApiBillingPeriodToUI } from "./billing.utils";

/**
 * API'dan gelen subscription plan verisini UI için uygun formata dönüştürür
 */
export const transformSubscriptionPlan = (
  apiPlan: SubscriptionPlanDto
): MembershipPlan => {
  const basePrice = apiPlan.price || 0;

  return {
    id: apiPlan.id?.toString() || "",
    name: translatePlanName(apiPlan.name) || "",
    displayName: apiPlan.displayName || translatePlanName(apiPlan.name) || "",
    icon: getPlanIcon(apiPlan.name),
    description: getPlanDescription(apiPlan),
    price: calculatePlanPrices(apiPlan, basePrice),
    billingPeriod: apiPlan.billingPeriod
      ? mapApiBillingPeriodToUI(apiPlan.billingPeriod)
      : undefined,
    discountPercentage: calculateDiscountPercentage(apiPlan),
    trialDays: apiPlan.trialDays,
    features: generatePlanFeatures(apiPlan),
    limits: extractPlanLimits(apiPlan),
    capabilities: extractPlanCapabilities(apiPlan),
    isPopular: apiPlan.isPopular,
    sortOrder: apiPlan.sortOrder,
    buttonText: getPlanButtonText(apiPlan.name, apiPlan.isPopular),
    buttonLink: `/auth/register?plan=${apiPlan.id}`,
  };
};

/**
 * Plan ismini Türkçe'ye çevirir
 */
const translatePlanName = (planName?: string): string => {
  if (!planName) return "";

  const name = planName.toLowerCase().trim();

  switch (true) {
    // STARTER varyasyonları
    case name === "starter":
    case name === "starter_yearly":
    case name.includes("starter"):
      return "Başlangıç";

    // PROFESSIONAL varyasyonları
    case name === "professional":
    case name === "professional_yearly":
    case name.includes("professional"):
      return "Profesyonel";

    // ENTERPRISE varyasyonları
    case name === "enterprise":
    case name === "enterprise_yearly":
    case name.includes("enterprise"):
      return "Kurumsal";

    // BASIC varyasyonları
    case name === "basic":
    case name === "basic_yearly":
    case name.includes("basic"):
      return "Temel";

    // STANDARD varyasyonları
    case name === "standard":
    case name === "standard_yearly":
    case name.includes("standard"):
      return "Standart";

    // PREMIUM varyasyonları
    case name === "premium":
    case name === "premium_yearly":
    case name.includes("premium"):
      return "Premium";

    // PRO varyasyonları
    case name === "pro":
    case name === "pro_yearly":
    case name.includes("pro"):
      return "Pro";

    default:
      // Eğer çeviri bulunamazsa, temizlenmiş ismi döndür (büyük harfler ve alt çizgiler temizlenmiş)
      return planName
        .replace(/_yearly/gi, "")
        .replace(/_monthly/gi, "")
        .replace(/_/g, " ")
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ");
  }
};

/**
 * Plan türüne göre ikon belirler
 */
const getPlanIcon = (planName?: string): string => {
  const name = planName?.toLowerCase() || "";

  switch (true) {
    case name.includes("basic") ||
      name.includes("temel") ||
      name.includes("starter"):
      return "ph ph-house";
    case name.includes("standard") || name.includes("standart"):
      return "ph-bold ph-tag";
    case name.includes("premium") ||
      name.includes("pro") ||
      name.includes("professional"):
      return "ph-bold ph-piggy-bank";
    case name.includes("enterprise") || name.includes("kurumsal"):
      return "ph-bold ph-buildings";
    default:
      return "ph ph-package";
  }
};

/**
 * Plan türüne göre açıklama oluşturur
 */
const getPlanDescription = (plan: SubscriptionPlanDto): string => {
  if (plan.description) return plan.description;

  const planName = plan.name?.toLowerCase() || "";

  switch (true) {
    case planName.includes("basic") ||
      planName.includes("temel") ||
      planName.includes("starter"):
      return "Küçük eğitim kurumları için temel özellikler içeren başlangıç paketi.";
    case planName.includes("standard") || planName.includes("standart"):
      return "Orta ölçekli eğitim kurumları için gelişmiş özellikler ve daha fazla kapasite.";
    case planName.includes("premium") ||
      planName.includes("pro") ||
      planName.includes("professional"):
      return "Büyük eğitim kurumları için sınırsız kapasite ve tüm premium özellikler.";
    case planName.includes("enterprise") || planName.includes("kurumsal"):
      return "Kurumsal çözümler için özel olarak tasarlanmış tam kapsamlı eğitim yönetim sistemi.";
    default:
      return "Eğitim kurumunuz için özel olarak tasarlanmış kapsamlı çözüm paketi.";
  }
};

/**
 * Plan fiyatlarını hesaplar
 */
const calculatePlanPrices = (
  plan: SubscriptionPlanDto,
  basePrice: number
): MembershipPrice => {
  const pricingTiers = parsePricingTiers(plan.pricingTiers);

  return {
    monthly:
      pricingTiers.monthly ||
      (plan.billingPeriod === "MONTHLY" ? basePrice : 0),
    quarterly: pricingTiers.quarterly || 0,
    yearly:
      pricingTiers.yearly || (plan.billingPeriod === "YEARLY" ? basePrice : 0),
    onetime:
      pricingTiers.onetime ||
      (plan.billingPeriod === "ONETIME" ? basePrice : undefined),
  };
};

/**
 * Plan için indirim yüzdesini hesaplar
 */
const calculateDiscountPercentage = (
  plan: SubscriptionPlanDto
): number | undefined => {
  const pricingTiers = parsePricingTiers(plan.pricingTiers);

  // Öncelikle API'dan gelen discount değerini kontrol et
  if (
    pricingTiers.discount &&
    typeof pricingTiers.discount === "number" &&
    pricingTiers.discount > 0
  ) {
    return pricingTiers.discount;
  }

  // Features'dan yearlyDiscount kontrol et
  if (plan.features) {
    try {
      const featuresObj = JSON.parse(plan.features);
      if (
        featuresObj.yearlyDiscount &&
        typeof featuresObj.yearlyDiscount === "number" &&
        featuresObj.yearlyDiscount > 0
      ) {
        return featuresObj.yearlyDiscount;
      }
    } catch (e) {
      // JSON parse hatası durumunda devam et
    }
  }

  // Eğer monthlyEquivalent ve savings varsa hesapla
  if (pricingTiers.monthlyEquivalent && pricingTiers.savings) {
    const monthlyTotal = pricingTiers.monthlyEquivalent * 12;
    const yearlyPrice = plan.price || 0;
    if (monthlyTotal > yearlyPrice && monthlyTotal > 0) {
      const discount = ((monthlyTotal - yearlyPrice) / monthlyTotal) * 100;
      return Math.round(discount);
    }
  }
  return undefined;
};

/**
 * Plan limitlerini çıkarır
 */
const extractPlanLimits = (plan: SubscriptionPlanDto): MembershipLimits => ({
  maxSchools: plan.maxSchools,
  maxUsers: plan.maxUsers,
  maxAppointmentsPerMonth: plan.maxAppointmentsPerMonth,
  maxGalleryItems: plan.maxGalleryItems,
  maxPostsPerMonth: plan.maxPostsPerMonth,
  storageGb: plan.storageGb,
});

/**
 * Plan yeteneklerini çıkarır
 */
const extractPlanCapabilities = (
  plan: SubscriptionPlanDto
): MembershipCapabilities => ({
  hasAnalytics: plan.hasAnalytics || false,
  hasCustomDomain: plan.hasCustomDomain || false,
  hasApiAccess: plan.hasApiAccess || false,
  hasPrioritySupport: plan.hasPrioritySupport || false,
  hasWhiteLabel: plan.hasWhiteLabel || false,
});

/**
 * Plan buton metnini belirler
 */
const getPlanButtonText = (planName?: string, isPopular?: boolean): string => {
  if (isPopular) return "En Popüler";

  const name = planName?.toLowerCase() || "";

  switch (true) {
    case name.includes("premium") ||
      name.includes("pro") ||
      name.includes("professional"):
      return "Premium Başlat";
    case name.includes("enterprise") || name.includes("kurumsal"):
      return "Kurumsal Çözüm";
    default:
      return "Başlayın";
  }
};

/**
 * JSON string'i güvenli bir şekilde parse eder
 */
const parsePricingTiers = (
  pricingTiersString?: string
): Record<string, number> => {
  if (!pricingTiersString) return {};

  try {
    return JSON.parse(pricingTiersString);
  } catch {
    return {};
  }
};

/**
 * Features string'ini parse eder ve MembershipFeature array'ine çevirir
 */
const parseFeatures = (featuresString?: string): MembershipFeature[] => {
  if (!featuresString) return [];

  try {
    const parsed = JSON.parse(featuresString);

    // Eğer array formatında geliyorsa direk döndür
    if (Array.isArray(parsed)) {
      return parsed;
    }

    // Eğer object formatında geliyorsa (backend format) MembershipFeature'a çevir
    if (typeof parsed === "object") {
      const features: MembershipFeature[] = [];

      // Backend'den gelen feature mapping
      const featureMapping: Record<
        string,
        { text: string; highlight?: boolean }
      > = {
        basicReporting: { text: "Temel raporlama sistemi" },
        emailSupport: { text: "E-posta desteği" },
        mobileApp: { text: "Mobil uygulama erişimi", highlight: true },
        customBranding: { text: "Özel marka ayarları" },
        advancedAnalytics: {
          text: "Gelişmiş analitik ve raporlama",
          highlight: true,
        },
        prioritySupport: { text: "Öncelikli destek", highlight: true },
        customDomain: { text: "Özel domain desteği" },
        apiAccess: { text: "API erişimi ve entegrasyonlar", highlight: true },
        whiteLabel: { text: "White Label çözümü", highlight: true },
        dedicatedManager: { text: "Özel hesap yöneticisi", highlight: true },
        yearlyDiscount: { text: "Yıllık ödeme indirimi", highlight: true },
      };

      Object.entries(parsed).forEach(([key, value]) => {
        if (key === "yearlyDiscount") {
          // yearlyDiscount özel durum - sadece yıllık planlarda göster
          if (typeof value === "number" && value > 0) {
            features.push({
              id: key,
              text: `%${value} yıllık indirim avantajı`,
              included: true,
              highlight: true,
            });
          }
        } else if (featureMapping[key]) {
          features.push({
            id: key,
            text: featureMapping[key].text,
            included: Boolean(value),
            highlight: featureMapping[key].highlight,
          });
        }
      });

      return features;
    }

    return [];
  } catch {
    return [];
  }
};

/**
 * Plan özelliklerini oluşturur
 */
const generatePlanFeatures = (
  plan: SubscriptionPlanDto
): MembershipFeature[] => {
  // Önce API'dan gelen features'ları dene
  const apiFeatures = parseFeatures(plan.features);
  if (apiFeatures.length > 0) {
    return apiFeatures;
  }

  // Eğer API'dan feature gelmemişse, plan bilgilerine göre oluştur
  return generateDefaultFeatures(plan);
};

/**
 * Plan türüne göre varsayılan özellikler oluşturur
 */
const generateDefaultFeatures = (
  plan: SubscriptionPlanDto
): MembershipFeature[] => {
  const features: MembershipFeature[] = [];
  const planName = plan.name?.toLowerCase() || "";

  // Kullanıcı limiti
  if (plan.maxUsers) {
    features.push({
      id: "users",
      text: `${plan.maxUsers} kullanıcıya kadar`,
      included: true,
      highlight: plan.maxUsers > 100,
    });
  }

  // Okul sayısı
  if (plan.maxSchools) {
    features.push({
      id: "schools",
      text: plan.maxSchools === 1 ? "1 okul" : `${plan.maxSchools} okula kadar`,
      included: true,
    });
  }

  // Randevu limiti
  if (plan.maxAppointmentsPerMonth) {
    features.push({
      id: "appointments",
      text: `Aylık ${plan.maxAppointmentsPerMonth} randevuya kadar`,
      included: true,
    });
  }

  // Depolama alanı
  if (plan.storageGb) {
    features.push({
      id: "storage",
      text: `${plan.storageGb} GB depolama alanı`,
      included: true,
    });
  }

  // Galeri limiti
  if (plan.maxGalleryItems) {
    features.push({
      id: "gallery",
      text: `${plan.maxGalleryItems} galeri öğesi`,
      included: true,
    });
  }

  // Aylık gönderi limiti
  if (plan.maxPostsPerMonth) {
    features.push({
      id: "posts",
      text: `Aylık ${plan.maxPostsPerMonth} gönderi`,
      included: true,
    });
  }

  // Plan türüne göre özellikler
  switch (true) {
    case planName.includes("basic") ||
      planName.includes("temel") ||
      planName.includes("starter"):
      features.push(
        { id: "reporting", text: "Temel raporlama sistemi", included: true },
        { id: "support", text: "E-posta desteği", included: true },
        { id: "messaging", text: "Mesajlaşma sistemi", included: false },
        { id: "analytics", text: "Gelişmiş analitik", included: false }
      );
      break;

    case planName.includes("standard") || planName.includes("standart"):
      features.push(
        { id: "reporting", text: "Gelişmiş raporlama sistemi", included: true },
        { id: "support", text: "Öncelikli e-posta desteği", included: true },
        { id: "messaging", text: "Mesajlaşma sistemi", included: true },
        { id: "integrations", text: "Temel entegrasyonlar", included: true }
      );
      break;

    case planName.includes("premium") ||
      planName.includes("pro") ||
      planName.includes("professional"):
      features.push(
        {
          id: "analytics",
          text: "Gelişmiş analitik ve raporlama",
          included: true,
        },
        {
          id: "support",
          text: "7/24 öncelikli destek",
          included: true,
          highlight: true,
        },
        { id: "integrations", text: "Özel entegrasyonlar", included: true },
        { id: "branding", text: "Özel marka ayarları", included: true }
      );
      break;

    case planName.includes("enterprise") || planName.includes("kurumsal"):
      features.push(
        {
          id: "unlimited_everything",
          text: "Sınırsız tüm özellikler",
          included: true,
          highlight: true,
        },
        {
          id: "dedicated_support",
          text: "Özel destek temsilcisi",
          included: true,
          highlight: true,
        },
        {
          id: "custom_development",
          text: "Özel geliştirme desteği",
          included: true,
        },
        {
          id: "enterprise_integrations",
          text: "Kurumsal entegrasyonlar",
          included: true,
        },
        {
          id: "white_label_full",
          text: "Tam White Label çözümü",
          included: true,
          highlight: true,
        },
        {
          id: "sla_guarantee",
          text: "SLA garantisi",
          included: true,
        }
      );
      break;

    default:
      // Genel planlar için temel özellikler ekle
      features.push(
        { id: "basic_features", text: "Temel eğitim yönetimi", included: true },
        { id: "support", text: "E-posta desteği", included: true }
      );
      break;
  }

  // Plan yeteneklerine göre ek özellikler - bunlar her durumda kontrol edilir
  if (plan.hasAnalytics) {
    features.push({
      id: "advanced_analytics",
      text: "Gelişmiş analitik ve raporlama",
      included: true,
      highlight: true,
    });
  }

  if (plan.hasCustomDomain) {
    features.push({
      id: "custom_domain",
      text: "Özel domain desteği",
      included: true,
    });
  }

  if (plan.hasApiAccess) {
    features.push({
      id: "api_access",
      text: "API erişimi ve entegrasyonlar",
      included: true,
      highlight: true,
    });
  }

  if (plan.hasPrioritySupport) {
    features.push({
      id: "priority_support",
      text: "Öncelikli müşteri desteği",
      included: true,
      highlight: true,
    });
  }

  if (plan.hasWhiteLabel) {
    features.push({
      id: "white_label",
      text: "Özel marka ayarları (White Label)",
      included: true,
      highlight: true,
    });
  }

  return features;
};
