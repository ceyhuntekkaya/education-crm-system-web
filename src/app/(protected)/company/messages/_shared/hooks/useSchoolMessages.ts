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
 * @param schoolId - Okul ID'si
 * @returns Mesaj verileri ve yönetim fonksiyonları
 */
export const useSchoolMessages = (
  schoolId: number | null
): UseSchoolMessagesReturn => {
  const {
    data: schoolMessageResponse,
    loading: messagesLoading,
    error: messagesError,
    refetch: refetchMessages,
  } = useGet<ApiResponseDto<MessageDto[]>>(
    schoolId ? API_ENDPOINTS.CONTENT.MESSAGES_BY_SCHOOL(schoolId) : null
  );

  return {
    schoolMessages: schoolMessageResponse?.data
      ? schoolMessageResponse.data
      : [],
    messagesLoading,
    messagesError,
    refetchMessages,
  };
};
