import { SectionConfig } from "../types";
import { basicInfoConfig } from "./basic-info-config";
import { featuresConfig } from "./features-config";
import { interactionConfig } from "./interaction-config";
import { statisticsConfig } from "./statistics-config";
import { mediaConfig } from "./media-config";
import { ctaConfig } from "./cta-config";
import { timestampConfig } from "./timestamp-config";
import { metaInfoConfig } from "./meta-info-config";
import { authorInfoConfig } from "./author-info-config";

/**
 * Tüm post section konfigürasyonlarını tanımlar
 * Mantıksal sıraya göre düzenlenmiştir: İçerik → Yayınlama → Etkileşim → Performans
 */
export const POST_SECTIONS: SectionConfig[] = [
  // 1. TEMEL BİLGİLER - Post başlık, içerik, tür ve durum (En önemli, ilk sırada)
  {
    title: "Gönderi Bilgileri",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-article",
    config: basicInfoConfig,
  },

  // 2. ZAMAN ÇİZELGESİ - Tarih ve zaman bilgileri (Gönderi temel bilgileri sonrası)
  {
    title: "Zaman Çizelgesi",
    titleColor: "text-neutral-500",
    titleIcon: "ph-bold ph-clock",
    config: timestampConfig,
  },

  // 3. YAZAR VE KURUM DETAYLARI - Kim tarafından yayınlandığı (İçerik sahibi bilgisi)
  {
    title: "Yazar & Kurum Detayları",
    titleColor: "text-teal-600",
    titleIcon: "ph-bold ph-graduation-cap",
    config: authorInfoConfig,
  },

  // 4. MEDYA İÇERİKLERİ - Görsel, video ve medya dosyaları (İçerik komponenti)
  {
    title: "Medya İçerikleri",
    titleColor: "text-purple-600",
    titleIcon: "ph-bold ph-image",
    config: mediaConfig,
  },

  // 5. ÖZEL ÖZELLİKLER - Öne çıkarma, sabitleme, moderasyon (Yayınlama ayarları)
  {
    title: "Özel Özellikler",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-star",
    config: featuresConfig,
  },

  // 6. ETKİLEŞİM AYARLARI - Yorum ve beğeni izinleri (Kullanıcı etkileşim kuralları)
  {
    title: "Etkileşim Ayarları",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-chat-circle",
    config: interactionConfig,
  },

  // 7. HAREKETE GEÇİRİCİ ELEMENTLER - CTA ve bağlantılar (Kullanıcı aksiyonları)
  {
    title: "Harekete Geçirici Elementler",
    titleColor: "text-orange-600",
    titleIcon: "ph-bold ph-megaphone",
    config: ctaConfig,
  },

  // 8. PERFORMANS İSTATİSTİKLERİ - Etkileşim metrikleri (Analiz)
  {
    title: "Performans İstatistikleri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-chart-line-up",
    config: statisticsConfig,
  },

  // 9. SEO VE METAVERİ - Etiketler, hashtag'ler, lokasyon (En son, teknik detaylar)
  {
    title: "SEO & Metaveri",
    titleColor: "text-indigo-600",
    titleIcon: "ph-bold ph-tag",
    config: metaInfoConfig,
  },
];
