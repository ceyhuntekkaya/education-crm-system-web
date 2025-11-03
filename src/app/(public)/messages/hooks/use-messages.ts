"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";

interface UseMessagesProps {
  userId?: string | number;
  enabled?: boolean;
}

interface UseMessagesReturn {
  conversationGroups: MessageConversationGroupDto[];
  messageLoading: boolean;
  messageError: string | null;
  refetchMessages: () => void;
}

/**
 * Kullanıcıya ait mesaj konuşmalarını getiren hook
 * @param userId - Kullanıcı ID'si
 * @param enabled - Hook'un aktif olup olmadığı
 * @returns Mesaj konuşma grupları ve yönetim fonksiyonları
 */
export const useMessages = ({
  userId,
  enabled = true,
}: UseMessagesProps): UseMessagesReturn => {
  const {
    data: messagesResponse,
    loading: messageLoading,
    error: messageError,
    refetch: refetchMessages,
  } = useGet<ApiResponseDto<MessageConversationGroupDto[]>>(
    userId ? API_ENDPOINTS.CONTENT.MESSAGES_BY_USER(userId) : null,
    { enabled: enabled && !!userId }
  );

  return {
    conversationGroups: messagesResponse?.data || [],
    messageLoading,
    messageError,
    refetchMessages,
  };
};
