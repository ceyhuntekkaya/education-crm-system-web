import { CustomFeeSectionConfig } from "../types";
import { customFeeBasicInfoConfig } from "./custom-fee-basic-info-config";
import { customFeeApplicationRulesConfig } from "./custom-fee-application-rules-config";
import { customFeeValidityConfig } from "./custom-fee-validity-config";
import { customFeePaymentSettingsConfig } from "./custom-fee-payment-settings-config";
import { customFeeStatsConfig } from "./custom-fee-stats-config";

/**
 * Tüm custom fee section konfigürasyonlarını tanımlar
 */
export const CUSTOM_FEE_SECTIONS: CustomFeeSectionConfig[] = [
  // 1. TEMEL BİLGİLER
  {
    title: "Temel Bilgiler",
    titleColor: "text-main-600",
    titleIcon: "ph-bold ph-info",
    config: customFeeBasicInfoConfig,
  },

  // 2. UYGULAMA KURALLARI
  {
    title: "Uygulama Kuralları",
    titleColor: "text-success-600",
    titleIcon: "ph-bold ph-check-circle",
    config: customFeeApplicationRulesConfig,
  },

  // 3. GEÇERLİLİK VE TARİHLER
  {
    title: "Geçerlilik ve Tarihler",
    titleColor: "text-info-600",
    titleIcon: "ph-bold ph-calendar",
    config: customFeeValidityConfig,
  },

  // 4. ÖDEME AYARLARI
  {
    title: "Ödeme Ayarları",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-credit-card",
    config: customFeePaymentSettingsConfig,
  },

  // 5. İSTATİSTİKLER
  {
    title: "İstatistikler",
    titleColor: "text-purple-600",
    titleIcon: "ph-bold ph-chart-bar",
    config: customFeeStatsConfig,
  },
];
