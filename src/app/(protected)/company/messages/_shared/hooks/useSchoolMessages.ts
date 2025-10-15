"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { MessageDto } from "@/types/dto/content/MessageDto";

interface UseSchoolMessagesReturn {
  schoolMessages: MessageDto[];
  messagesLoading: boolean;
  messagesError: string | null;
  refetchMessages: () => void;
}

/**
 * Seçili okul için mesaj verilerini yöneten hook
 * @param schoolId - Okul ID'si (opsiyonel)
 * @returns Mesaj verileri ve yönetim fonksiyonları
 */
export const useSchoolMessages = (
  schoolId?: number | null
): UseSchoolMessagesReturn => {
  // Eğer schoolId yoksa, tüm mesajları getir
  const endpoint = schoolId
    ? API_ENDPOINTS.CONTENT.MESSAGES_BY_SCHOOL(schoolId)
    : "/content/messages"; // Tüm mesajlar için endpoint

  const {
    data: schoolMessageResponse,
    loading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useGet<ApiResponseDto<MessageDto[]>>(endpoint);

  return {
    schoolMessages: schoolMessageResponse?.data || [],
    messagesLoading,
    messagesError,
    refetchMessages,
  };
};
