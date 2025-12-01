"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";
import { useAuth } from "@/contexts";

/**
 * Hook to fetch user messages
 * Internal hook used by DataProvider
 * @param enabled - Veri çekme işleminin yapılıp yapılmayacağını belirler
 */
export const useMessages = (enabled: boolean = true) => {
  const { user } = useAuth();

  const {
    data: messagesResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<MessageConversationGroupDto[]>>(
    user?.id && enabled
      ? API_ENDPOINTS.CONTENT.MESSAGES_BY_USER(user.id)
      : null,
    { enabled: !!user?.id && enabled }
  );

  return {
    conversationGroups: messagesResponse?.data || [],
    loading,
    error,
    refetch,
  };
};
