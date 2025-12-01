import { SectionConfig } from "../types";
import { galleryInfoConfig } from "./gallery-info-config";
import { basicInfoConfig } from "./basic-info-config";
import { visibilityConfig } from "./visibility-config";
import { creatorInfoConfig } from "./creator-info-config";
import { galleryItemsConfig } from "./gallery-items-config";
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

  // 4. OLUŞTURAN KULLANICI - Kullanıcı bilgileri
  {
    title: "Oluşturan Kullanıcı",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-user",
    config: creatorInfoConfig,
  },

  // 5. GALERİ ÖĞELERİ - Galeri içeriği
  {
    title: "Galeri Öğeleri",
    titleColor: "text-purple-600",
    titleIcon: "ph-bold ph-images",
    config: galleryItemsConfig,
  },

  // 6. ZAMAN DAMGALARI - Oluşturma tarihleri
  {
    title: "Zaman Damgaları",
    titleColor: "text-neutral-500",
    titleIcon: "ph-bold ph-clock",
    config: timestampConfig,
  },
];
