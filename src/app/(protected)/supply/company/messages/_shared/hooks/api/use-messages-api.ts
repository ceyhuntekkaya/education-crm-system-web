"use client";

import { useGet, usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  ConversationCreateDto,
  MessageCreateDto,
  ApiResponsePageConversationDto,
  ApiResponsePageMessageDto,
  ApiResponseConversationDto,
  ApiResponseMessageDto,
} from "@/types/dto/supply";

/**
 * Hook to fetch all conversations for a company
 */
export const useConversationsByCompany = (
  companyId?: number,
  options?: {
    onSuccess?: (data: ApiResponsePageConversationDto) => void;
    onError?: (error: string) => void;
    onFinally?: () => void;
  }
) => {
  return useGet<ApiResponsePageConversationDto>(
    companyId ? API_ENDPOINTS.SUPPLY.CONVERSATIONS.BY_COMPANY(companyId) : null,
    {
      enabled: !!companyId,
      ...options,
    }
  );
};

/**
 * Hook to create a new conversation
 */
export const useCreateConversation = () => {
  return usePost<ApiResponseConversationDto, ConversationCreateDto>(
    API_ENDPOINTS.SUPPLY.CONVERSATIONS.CREATE,
    {
      showSnackbar: true,
    }
  );
};

/**
 * Hook to fetch messages for a specific conversation
 */
export const useMessagesByConversation = (conversationId?: number) => {
  return useGet<ApiResponsePageMessageDto>(
    conversationId
      ? API_ENDPOINTS.SUPPLY.MESSAGES.BY_CONVERSATION(conversationId)
      : null,
    {
      enabled: !!conversationId,
    }
  );
};

/**
 * Hook to send a message in a conversation
 */
export const useSendMessage = (conversationId: number) => {
  return usePost<ApiResponseMessageDto, MessageCreateDto>(
    API_ENDPOINTS.SUPPLY.MESSAGES.SEND(conversationId),
    {
      showSnackbar: true,
    }
  );
};
