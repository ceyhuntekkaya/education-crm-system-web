import { CustomFeeSectionConfig } from "../types";
import { customFeeBasicInfoConfig } from "./custom-fee-basic-info-config";
import { customFeeApplicationRulesConfig } from "./custom-fee-application-rules-config";
import { customFeePaymentSettingsConfig } from "./custom-fee-payment-settings-config";

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

  // 3. ÖDEME AYARLARI
  {
    title: "Ödeme Ayarları",
    titleColor: "text-warning-600",
    titleIcon: "ph-bold ph-credit-card",
    config: customFeePaymentSettingsConfig,
  },
];
