import { SectionConfig } from "../types";
import { campaignInfoConfig } from "./campaign-info-config";
import { basicInfoConfig } from "./basic-info-config";
import { discountConfig } from "./discount-config";
import { targetAudienceConfig } from "./target-audience-config";
import { usageLimitsConfig } from "./usage-limits-config";
import { datesConfig } from "./dates-config";
import { paymentInfoConfig } from "./payment-info-config";
import { mediaConfig } from "./media-config";
import { statisticsConfig } from "./statistics-config";
import { descriptionConfig } from "./description-config";
import { metaInfoConfig } from "./meta-info-config";
import { managementConfig } from "./management-config";
import { campaignSchoolsConfig } from "./campaign-schools-config";
import { campaignContentsConfig } from "./campaign-contents-config";
import { bonusesGiftsConfig } from "./bonuses-gifts-config";
import { ctaInfoConfig } from "./cta-info-config";

/**
 * Tüm section konfigürasyonlarını tanımlar
 */
export const CAMPAIGN_SECTIONS: SectionConfig[] = [
  // 1. HIZLI BİLGİLER - Kalan süre ve tür
  {
    title: "Hızlı Bilgiler",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-lightning",
    config: campaignInfoConfig,
  },

  // 2. DETAYLI - Temel kampanya bilgileri
  {
    title: "Temel Bilgiler",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-info",
    config: basicInfoConfig,
  },

  // 2. TARİHLER - Kampanyanın ne zaman aktif olduğu
  {
    title: "Tarih Bilgileri",
    titleColor: "text-secondary-600",
    titleIcon: "ph-bold ph-calendar",
    config: datesConfig,
  },

  // 3. AÇIKLAMALAR - Kampanyanın ne olduğu (içerikler dahil)
  {
    title: "Açıklamalar",
    titleColor: "text-secondary-600",
    titleIcon: "ph-bold ph-text-align-left",
    config: descriptionConfig,
  },

  // 4. FİNANSAL BİLGİLER - İndirim ve ödeme bilgileri
  {
    title: "İndirim Bilgileri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-percent",
    config: discountConfig,
  },
  {
    title: "Ödeme Bilgileri",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-credit-card",
    config: paymentInfoConfig,
  },

  // 5. HEDİYELER VE BONUSLAR - Kampanyanın çekici yanları
  {
    title: "Hediyeler ve Bonuslar",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-gift",
    config: bonusesGiftsConfig,
  },

  // 6. HEDEF KİTLE VE LIMITLER
  {
    title: "Hedef Kitle",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-users",
    config: targetAudienceConfig,
  },
  {
    title: "Kullanım Limitleri",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-gauge",
    config: usageLimitsConfig,
  },

  // 7. MEDYA VE GÖRSEL İÇERİKLER
  {
    title: "Medya ve Görseller",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-image",
    config: mediaConfig,
  },
  {
    title: "CTA ve Görsel Bilgiler",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-cursor-click",
    config: ctaInfoConfig,
  },

  // 8. KAMPANYA İLİŞKİLERİ
  {
    title: "Kampanya Okulları",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-buildings",
    config: campaignSchoolsConfig,
  },
  {
    title: "Kampanya İçerikleri",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-images",
    config: campaignContentsConfig,
  },

  // 9. PERFORMANS VE ANALİTİK
  {
    title: "İstatistikler",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-chart-line",
    config: statisticsConfig,
  },

  // 10. TEKNİK VE YÖNETİM BİLGİLERİ
  // {
  //   title: "SEO Bilgileri",
  //   titleColor: "text-warning-600",
  //   titleIcon: "ph-bold ph-globe",
  //   config: metaInfoConfig,
  // },
  {
    title: "Yönetim Bilgileri",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-gear",
    config: managementConfig,
  },
];
