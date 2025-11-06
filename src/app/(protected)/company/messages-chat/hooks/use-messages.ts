"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto } from "@/types";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";
import { useCompany } from "../../_shared/context";

interface UseMessagesProps {
  enabled?: boolean;
}

interface UseMessagesReturn {
  conversationGroups: MessageConversationGroupDto[];
  messageLoading: boolean;
  messageError: string | null;
  refetchMessages: () => void;
}

/**
 * Okula ait mesaj konuşmalarını getiren hook
 * @param enabled - Hook'un aktif olup olmadığı
 * @returns Mesaj konuşma grupları ve yönetim fonksiyonları
 */
export const useMessages = ({
  enabled = true,
}: UseMessagesProps = {}): UseMessagesReturn => {
  const { selectedSchool } = useCompany();
  const schoolId = selectedSchool?.id;

  const {
    data: messagesResponse,
    loading: messageLoading,
    error: messageError,
    refetch: refetchMessages,
  } = useGet<ApiResponseDto<MessageConversationGroupDto[]>>(
    schoolId ? API_ENDPOINTS.CONTENT.MESSAGES_BY_SCHOOL(schoolId) : null
  );

  return {
    conversationGroups: messagesResponse?.data || [],
    messageLoading,
    messageError,
    refetchMessages,
  };
};
