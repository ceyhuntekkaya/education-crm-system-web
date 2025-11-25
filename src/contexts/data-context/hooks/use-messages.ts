"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";
import { useAuth } from "@/contexts";

/**
 * Hook to fetch user messages
 * Internal hook used by DataProvider
 */
export const useMessages = () => {
  const { user } = useAuth();

  const {
    data: messagesResponse,
    loading,
    error,
    refetch,
  } = useGet<ApiResponseDto<MessageConversationGroupDto[]>>(
    user?.id ? API_ENDPOINTS.CONTENT.MESSAGES_BY_USER(user.id) : null,
    { enabled: !!user?.id }
  );

  return {
    conversationGroups: messagesResponse?.data || [],
    loading,
    error,
    refetch,
  };
};
