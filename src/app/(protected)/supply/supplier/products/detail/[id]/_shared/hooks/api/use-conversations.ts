"use client";

import { useGet, usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import type {
  MessageType,
  MessagePriority,
  MessageStatus,
  MessageCreateDto,
  MessageDto,
  ConversationCreateDto,
  ConversationDto,
} from "@/types/dto/supply";
import type {
  ApiResponseConversation,
  ApiResponseConversations,
  ApiResponsePageConversationDto,
  ApiResponseConversationDto,
} from "@/types/dto/supply/conversation.dto";
import type {
  ApiResponseMessage,
  ApiResponseMessages,
  ApiResponsePageMessageDto,
  ApiResponseMessageDto,
} from "@/types/dto/supply/message.dto";

// Re-export types for external use
export type {
  MessageType,
  MessagePriority,
  MessageStatus,
  MessageCreateDto,
  MessageDto,
  ConversationCreateDto,
  ConversationDto,
  ApiResponseConversation,
  ApiResponseConversations,
  ApiResponsePageConversationDto,
  ApiResponseMessage,
  ApiResponseMessages,
  ApiResponsePageMessageDto,
  ApiResponseMessageDto,
  ApiResponseConversationDto,
};

// ========================
// HOOKS - CONVERSATIONS
// ========================

/**
 * Yeni konuşma oluşturma hook'u (Güncellenmiş)
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
 * ID'ye göre konuşma getirme hook'u
 */
export const useConversationById = (id?: number) => {
  return useGet<ApiResponseConversation>(
    id ? API_ENDPOINTS.SUPPLY.CONVERSATIONS.BY_ID(id) : null,
    {
      enabled: !!id,
    }
  );
};

/**
 * Ürüne göre konuşmaları getirme hook'u
 * @param productId - Ürün ID'si
 * @param options - API options (onSuccess, onError, onFinally)
 */
export const useConversationsByProduct = (
  productId?: number,
  options?: {
    onSuccess?: (data: ApiResponseConversations) => void;
    onError?: (error: string) => void;
    onFinally?: () => void;
  }
) => {
  return useGet<ApiResponseConversations>(
    productId ? API_ENDPOINTS.SUPPLY.CONVERSATIONS.BY_PRODUCT(productId) : null,
    {
      enabled: !!productId,
      ...options,
    }
  );
};

/**
 * Şirkete göre konuşmaları getirme hook'u (Güncellenmiş)
 * @param companyId - Şirket ID'si
 * @param options - API options (onSuccess, onError, onFinally)
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

// ========================
// HOOKS - MESSAGES
// ========================

/**
 * Mesaj gönderme hook'u (Güncellenmiş)
 */
export const useSendMessage = (conversationId: number) => {
  return usePost<ApiResponseMessageDto, MessageCreateDto>(
    API_ENDPOINTS.SUPPLY.MESSAGES.SEND(conversationId),
    {
      showSnackbar: true,
    }
  );
};

/**
 * Konuşmaya ait mesajları getirme hook'u (Güncellenmiş)
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
