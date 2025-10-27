/**
 * Edit modunda disable edilecek alanlar
 * Bu alanlar güncelleme sırasında değiştirilemez ve gönderilmez
 */
export const DISABLED_FIELDS_IN_EDIT_MODE = [
  "id", // ID alanı asla güncellenmemeli
  "foreignLanguages", // Kaldırılan alan
  "registrationFee", // Kaldırılan alan
  "monthlyFee", // Kaldırılan alan
  "annualFee", // Kaldırılan alan
] as const;
