import { CampusSectionConfig } from "../types";
import { campusGeneralInfoConfig } from "./campus-general-info-config";
import { campusSocialMediaConfig } from "./campus-social-media-config";
import { campusSeoConfig } from "./campus-seo-config";
import { campusLocationConfig } from "./campus-location-config";
import { campusContactConfig } from "./campus-contact-config";

/**
 * Tüm campus section konfigürasyonlarını tanımlar
 */
export const CAMPUS_SECTIONS: CampusSectionConfig[] = [
  // 1. GENEL BİLGİLER
  {
    title: "Genel Kampüs Bilgileri",
    titleColor: "text-main-600",
    titleIcon: "ph-bold ph-buildings",
    config: campusGeneralInfoConfig,
  },

  // 2. İLETİŞİM BİLGİLERİ
  {
    title: "İletişim Bilgileri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-phone",
    config: campusContactConfig,
  },

  // 3. LOKASYON BİLGİLERİ
  {
    title: "Lokasyon Bilgileri",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-map-pin",
    config: campusLocationConfig,
  },

  // 4. SOSYAL MEDYA BİLGİLERİ
  {
    title: "Sosyal Medya",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-share-network",
    config: campusSocialMediaConfig,
  },

  // 5. SEO BİLGİLERİ
  // {
  //   title: "SEO Bilgileri",
  //   titleColor: "text-purple-600",
  //   titleIcon: "ph-bold ph-magnifying-glass",
  //   config: campusSeoConfig,
  // },
];
