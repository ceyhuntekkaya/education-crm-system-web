/**
 * URL'den liste ID'sini parse etme fonksiyonu
 * @param id - URL'den gelen ID string
 * @returns Parsed list ID (geçersizse 1 döner)
 */
export const parseListIdFromUrl = (id: string): number => {
  const numId = parseInt(id, 10);
  return isNaN(numId) ? 1 : numId;
};
