"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { MessageDto } from "@/types/dto/content/MessageDto";

interface UseMessageByIdReturn {
  message: MessageDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir message verisi getiren hook
 * @param id - Message ID'si
 * @returns Message verisi ve yönetim fonksiyonları
 */
export const useMessageById = (id: number): UseMessageByIdReturn => {
  const {
    data: messageResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseDto<MessageDto>>(
    id ? API_ENDPOINTS.CONTENT.MESSAGE_BY_ID(id) : null
  );

  // console.log(messageResponse?.data);

  return {
    message: messageResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
