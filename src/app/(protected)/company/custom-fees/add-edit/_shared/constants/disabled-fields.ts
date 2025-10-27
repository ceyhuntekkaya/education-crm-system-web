/**
 * Edit modunda disable edilecek alanlar
 * Bu alanlar güncelleme sırasında değiştirilemez
 */
export const DISABLED_FIELDS_IN_EDIT_MODE = [
  // Custom fee için genellikle tüm alanlar güncellenebilir
  // Eğer belirli alanların değiştirilmesini istemiyorsanız buraya ekleyin
  // Örnek: "schoolId" gibi
] as const;
