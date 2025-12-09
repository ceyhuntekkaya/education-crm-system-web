import {
  basicInfoConfig,
  tuitionFeeConfig,
  // registrationFeeConfig,
  // additionalFeeConfig,
  // serviceFeeConfig,
  totalCostConfig,
  paymentInfoConfig,
  discountConfig,
  otherInfoConfig,
  descriptionConfig,
} from "./";

import type { SectionConfig } from "../types";

/**
 * Ana pricing section'ları tanımlar
 */
export const PRICING_SECTIONS: SectionConfig[] = [
  {
    title: "Temel Bilgiler",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-info",
    config: basicInfoConfig,
  },
  {
    title: "Öğrenim Ücretleri",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-graduation-cap",
    config: tuitionFeeConfig,
  },
  // {
  //   title: "Kayıt ve Başvuru Ücretleri",
  //   titleColor: "text-warning-600",
  //   titleIcon: "ph-bold ph-identification-card",
  //   config: registrationFeeConfig,
  // },
  // {
  //   title: "Ek Ücretler",
  //   titleColor: "text-info-600",
  //   titleIcon: "ph-bold ph-plus-circle",
  //   config: additionalFeeConfig,
  // },
  // {
  //   title: "Hizmet Ücretleri",
  //   titleColor: "text-secondary-600",
  //   titleIcon: "ph-bold ph-gear",
  //   config: serviceFeeConfig,
  // },
  {
    title: "Toplam Maliyetler",
    titleColor: "text-danger-600",
    titleIcon: "ph-bold ph-calculator",
    config: totalCostConfig,
  },
  {
    title: "Ödeme Bilgileri",
    titleColor: "text-primary-600",
    titleIcon: "ph-bold ph-credit-card",
    config: paymentInfoConfig,
  },
  {
    title: "İndirimler ve Burslar",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-percent",
    config: discountConfig,
  },
  {
    title: "Geçerlilik ve Sürüm Bilgileri",
    titleColor: "text-neutral-600",
    titleIcon: "ph-bold ph-note",
    config: otherInfoConfig,
  },
];

/**
 * Açıklamalar section'ı tanımlar - KULLANILMIYOR
 */
export const DESCRIPTION_SECTION: SectionConfig = {
  title: "Açıklamalar ve Koşullar",
  titleColor: "text-warning-600",
  titleIcon: "ph-bold ph-note-pencil",
  config: descriptionConfig,
};
