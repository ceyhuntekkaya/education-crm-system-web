"use client";

import { usePut } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { MessageDto } from "@/types/dto/content/MessageDto";

interface UseMarkMessageAsReadReturn {
  markAsRead: (messageId: string | number) => Promise<MessageDto | null>;
  markingAsRead: boolean;
  markAsReadError: string | null;
}

/**
 * Mesajı okundu olarak işaretleyen hook
 * @returns Mesaj işaretleme fonksiyonu ve durum bilgileri
 */
export const useMarkMessageAsRead = (): UseMarkMessageAsReadReturn => {
  const { mutate, loading, error } = usePut<
    ApiResponseDto<MessageDto>,
    { messageId: string | number }
  >((variables) =>
    API_ENDPOINTS.CONTENT.MESSAGE_MARK_AS_READ(variables.messageId)
  );

  const markAsRead = async (
    messageId: string | number
  ): Promise<MessageDto | null> => {
    const result = await mutate({ messageId });
    return result?.data || null;
  };

  return {
    markAsRead,
    markingAsRead: loading,
    markAsReadError: error,
  };
};
