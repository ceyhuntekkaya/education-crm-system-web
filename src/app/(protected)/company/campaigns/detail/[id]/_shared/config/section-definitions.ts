import { SectionConfig } from "../types";
import { campaignInfoConfig } from "./campaign-info-config";
import { basicInfoConfig } from "./basic-info-config";
import { discountConfig } from "./discount-config";
import { datesConfig } from "./dates-config";
import { descriptionConfig } from "./description-config";
import { managementConfig } from "./management-config";

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

  // 2. TEMEL BİLGİLER - Kampanya başlığı, türü, durum, ayarlar
  {
    title: "Temel Bilgiler",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-info",
    config: basicInfoConfig,
  },

  // 3. TARİHLER - Kampanya başlangıç ve bitiş tarihleri
  {
    title: "Tarih Bilgileri",
    titleColor: "text-secondary-600",
    titleIcon: "ph-bold ph-calendar",
    config: datesConfig,
  },

  // 4. AÇIKLAMALAR - Kampanya açıklamaları
  {
    title: "Açıklamalar",
    titleColor: "text-secondary-600",
    titleIcon: "ph-bold ph-text-align-left",
    config: descriptionConfig,
  },

  // 5. İNDİRİM BİLGİLERİ - İndirim türü ve miktarı
  {
    title: "İndirim Bilgileri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-percent",
    config: discountConfig,
  },

  // 6. YÖNETİM BİLGİLERİ - Oluşturulma bilgileri
  {
    title: "Yönetim Bilgileri",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-gear",
    config: managementConfig,
  },
];
