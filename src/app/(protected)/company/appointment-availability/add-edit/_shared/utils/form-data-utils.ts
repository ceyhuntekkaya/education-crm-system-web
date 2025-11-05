import { AppointmentSlotCreateDto } from "@/types";

/**
 * Edit için veriyi filtreler - sadece güncellenmesi gereken alanları içerir
 */
export const filterDataForEdit = (
  data: AppointmentSlotCreateDto
): Partial<AppointmentSlotCreateDto> => {
  // Şimdilik tüm alanları gönder, gerekirse sadece değişen alanları filtrele
  return data;
};
