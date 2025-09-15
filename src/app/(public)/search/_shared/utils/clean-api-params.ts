import { SchoolSearchDto } from "@/types";

/**
 * API parametrelerinden undefined değerleri temizler
 * 
 * @param apiParams - Temizlenecek API parametreleri
 * @returns Temizlenmiş API parametreleri
 */
export const cleanApiParams = (apiParams: SchoolSearchDto): Record<string, any> => {
  return Object.fromEntries(
    Object.entries(apiParams).filter(([_, value]) => value !== undefined)
  );
};
