import { SectionConfig } from "../types";
import { basicInfoConfig } from "./basic-info-config";
import { discountConfig } from "./discount-config";
import { datesConfig } from "./dates-config";
import { descriptionConfig } from "./description-config";
import { managementConfig } from "./management-config";

/**
 * Tüm section konfigürasyonlarını tanımlar
 * Önem sırasına göre düzenlenmiştir
 */
export const CAMPAIGN_SECTIONS: SectionConfig[] = [
  // 1. TEMEL BİLGİLER - Kampanya başlığı, türü ve ayarlar (En önemli)
  {
    title: "Temel Bilgiler",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-info",
    config: basicInfoConfig,
  },

  // 2. TARİHLER VE SÜRE - Kampanya tarihleri ve kalan süre
  {
    title: "Kampanya Dönemi",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-calendar",
    config: datesConfig,
  },

  // 3. İNDİRİM BİLGİLERİ - İndirim türü ve miktarı
  {
    title: "İndirim Bilgileri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-percent",
    config: discountConfig,
  },

  // 4. AÇIKLAMALAR - Kampanya açıklamaları
  {
    title: "Açıklamalar",
    titleColor: "text-secondary-600",
    titleIcon: "ph-bold ph-text-align-left",
    config: descriptionConfig,
  },

  // 5. YÖNETİM BİLGİLERİ - Oluşturulma bilgileri
  {
    title: "Yönetim Bilgileri",
    titleColor: "text-neutral-600",
    titleIcon: "ph-bold ph-user-gear",
    config: managementConfig,
  },
];
