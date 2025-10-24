/**
 * Edit modunda disable edilecek alanlar
 * Bu alanlar güncelleme sırasında değiştirilemez
 */
export const DISABLED_FIELDS_IN_EDIT_MODE = [
  // Brand için genellikle tüm alanlar güncellenebilir
  // Eğer belirli alanların değiştirilmesini istemiyorsanız buraya ekleyin
  // Örnek: "slug", "id" gibi
] as const;
