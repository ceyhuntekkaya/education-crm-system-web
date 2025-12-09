import { SectionConfig } from "../types";
import { basicInfoConfig } from "./basic-info-config";
import { featuresConfig } from "./features-config";
import { statisticsConfig } from "./statistics-config";
import { mediaConfig } from "./media-config";
import { ctaConfig } from "./cta-config";
import { timestampConfig } from "./timestamp-config";
import { metaInfoConfig } from "./meta-info-config";
import { authorDetailsConfig } from "./author-details-config";
import { institutionDetailsConfig } from "./institution-details-config";

/**
 * Tüm post section konfigürasyonlarını tanımlar
 * API'den gelen verilere göre optimize edilmiş basit yapı
 */
export const POST_SECTIONS: SectionConfig[] = [
  // 1. TEMEL BİLGİLER - Post başlık, içerik, tür ve durum
  {
    title: "Gönderi Bilgileri",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-article",
    config: basicInfoConfig,
  },

  // 2. KURUM VE YAZAR BİLGİLERİ - Hangi kurumdan ve kim tarafından yayınlandığı
  {
    title: "Kurum & Yazar Detayları",
    titleColor: "text-blue-600",
    titleIcon: "ph-bold ph-graduation-cap",
    config: institutionDetailsConfig,
  },

  // 3. PERFORMANS İSTATİSTİKLERİ - Beğeni ve görüntüleme sayıları
  {
    title: "Performans İstatistikleri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-chart-line-up",
    config: statisticsConfig,
  },

  // 5. ÖZEL ÖZELLİKLER - Öne çıkarma ve sabitleme durumu
  {
    title: "Özel Özellikler",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-star",
    config: featuresConfig,
  },

  // 6. ZAMAN BİLGİLERİ - Yayın, zamanlama ve bitiş tarihleri
  {
    title: "Zaman Bilgileri",
    titleColor: "text-neutral-500",
    titleIcon: "ph-bold ph-clock",
    config: timestampConfig,
  },
];
