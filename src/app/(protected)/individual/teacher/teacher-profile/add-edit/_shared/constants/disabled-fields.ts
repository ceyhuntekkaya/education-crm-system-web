/**
 * Edit modunda disable edilecek alanlar
 * Bu alanlar güncelleme sırasında değiştirilemez
 */
export const DISABLED_FIELDS_IN_EDIT_MODE = [
  // Email ve telefon genellikle değiştirilemez (birincil kimlik bilgileri)
  // İhtiyaca göre bu liste güncellenebilir
] as const;
