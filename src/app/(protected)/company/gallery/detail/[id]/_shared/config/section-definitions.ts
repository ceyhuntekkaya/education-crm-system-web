import { SectionConfig } from "../types";
import { galleryInfoConfig } from "./gallery-info-config";
import { basicInfoConfig } from "./basic-info-config";
import { visibilityConfig } from "./visibility-config";
import { brandInfoConfig } from "./brand-info-config";
import { campusInfoConfig } from "./campus-info-config";
import { schoolInfoConfig } from "./school-info-config";
import { creatorInfoConfig } from "./creator-info-config";
import { mediaConfig } from "./media-config";
import { galleryItemsConfig } from "./gallery-items-config";
import { statisticsConfig } from "./statistics-config";
import { metaInfoConfig } from "./meta-info-config";
import { timestampConfig } from "./timestamp-config";

/**
 * Tüm section konfigürasyonlarını tanımlar
 */
export const GALLERY_SECTIONS: SectionConfig[] = [
  // 1. HIZLI BİLGİLER - Galeri özet bilgileri
  {
    title: "Hızlı Bilgiler",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-lightning",
    config: galleryInfoConfig,
  },

  // 2. TEMEL BİLGİLER - Galeri detay bilgileri
  {
    title: "Temel Bilgiler",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-info",
    config: basicInfoConfig,
  },

  // 3. GÖRÜNÜRLİLİK VE ERİŞİM - Görünürlük ayarları
  {
    title: "Görünürlük ve Erişim",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-eye",
    config: visibilityConfig,
  },

  // 4. MARKA BİLGİLERİ - Marka detayları
  {
    title: "Marka Bilgileri",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-buildings",
    config: brandInfoConfig,
  },

  // 5. KAMPÜS BİLGİLERİ - Kampüs detayları
  {
    title: "Kampüs Bilgileri",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-building",
    config: campusInfoConfig,
  },

  // 6. OKUL BİLGİLERİ - Okul detayları
  {
    title: "Okul Bilgileri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-graduation-cap",
    config: schoolInfoConfig,
  },

  // 7. OLUŞTURAN KULLANICI - Kullanıcı bilgileri
  {
    title: "Oluşturan Kullanıcı",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-user",
    config: creatorInfoConfig,
  },

  // 8. MEDYA BİLGİLERİ - Kapak resmi ve medya özellikleri
  {
    title: "Medya Bilgileri",
    titleColor: "text-purple-600",
    titleIcon: "ph-bold ph-image",
    config: mediaConfig,
  },

  // 9. GALERİ ÖĞELERİ - Galeri içeriği
  {
    title: "Galeri Öğeleri",
    titleColor: "text-purple-600",
    titleIcon: "ph-bold ph-images",
    config: galleryItemsConfig,
  },

  // 10. İSTATİSTİKLER - Görüntüleme, indirme vb.
  {
    title: "İstatistikler",
    titleColor: "text-secondary-600",
    titleIcon: "ph-bold ph-chart-bar",
    config: statisticsConfig,
  },

  // 11. META BİLGİLERİ - SEO ve etiketler
  {
    title: "Meta Bilgileri",
    titleColor: "text-neutral-600",
    titleIcon: "ph-bold ph-gear",
    config: metaInfoConfig,
  },

  // 12. ZAMAN DAMGALARI - Oluşturma tarihleri
  {
    title: "Zaman Damgaları",
    titleColor: "text-neutral-500",
    titleIcon: "ph-bold ph-clock",
    config: timestampConfig,
  },
];
