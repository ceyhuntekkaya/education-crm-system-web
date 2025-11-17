import { BrandSectionConfig } from "../types";
import { brandGeneralInfoConfig } from "./brand-general-info-config";
import { brandSocialMediaConfig } from "./brand-social-media-config";
import { brandSeoConfig } from "./brand-seo-config";

/**
 * Tüm brand section konfigürasyonlarını tanımlar
 */
export const BRAND_SECTIONS: BrandSectionConfig[] = [
  // 1. GENEL BİLGİLER
  {
    title: "Genel Marka Bilgileri",
    titleColor: "text-main-600",
    titleIcon: "ph-bold ph-buildings",
    config: brandGeneralInfoConfig,
  },

  // 2. SOSYAL MEDYA BİLGİLERİ
  {
    title: "Sosyal Medya",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-share-network",
    config: brandSocialMediaConfig,
  },

  // 4. SEO BİLGİLERİ
  // {
  //   title: "SEO Bilgileri",
  //   titleColor: "text-success-600",
  //   titleIcon: "ph-bold ph-magnifying-glass",
  //   config: brandSeoConfig,
  // },
];
