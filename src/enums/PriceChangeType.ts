export enum PriceChangeType {
  INCREASE = "INCREASE", // Artış
  DECREASE = "DECREASE", // Azalış
  NEW_FEE = "NEW_FEE", // Yeni ücret
  REMOVED_FEE = "REMOVED_FEE", // Kaldırılan ücret
  RESTRUCTURE = "RESTRUCTURE", // Yeniden yapılandırma
  SEASONAL_ADJUSTMENT = "SEASONAL_ADJUSTMENT", // Mevsimsel ayarlama
  INFLATION_ADJUSTMENT = "INFLATION_ADJUSTMENT", // Enflasyon ayarlaması
  MARKET_ADJUSTMENT = "MARKET_ADJUSTMENT", // Piyasa ayarlaması
  PROMOTION = "PROMOTION", // Promosyon
  CORRECTION = "CORRECTION", // Düzeltme
  POLICY_CHANGE = "POLICY_CHANGE", // Politika değişikliği
  COMPETITIVE_RESPONSE = "COMPETITIVE_RESPONSE", // Rekabetçi yanıt
  COST_ADJUSTMENT = "COST_ADJUSTMENT", // Maliyet ayarlaması
  QUALITY_IMPROVEMENT = "QUALITY_IMPROVEMENT", // Kalite artırımı
  SERVICE_ENHANCEMENT = "SERVICE_ENHANCEMENT", // Hizmet geliştirme
  REGULATORY_CHANGE = "REGULATORY_CHANGE", // Yasal değişiklik
  OTHER = "OTHER", // Diğer
}
