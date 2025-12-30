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
  ApiResponseConversation,
  ApiResponseConversations,
  ApiResponseMessage,
  ApiResponseMessages,
} from "../../types/supply";

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
  ApiResponseMessage,
  ApiResponseMessages,
};

// ========================
// HOOKS - CONVERSATIONS
// ========================

/**
 * Yeni konuşma oluşturma hook'u
 */
export const useCreateConversation = () => {
  return usePost<ApiResponseConversation, ConversationCreateDto>(
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
 * Şirkete göre konuşmaları getirme hook'u
 * @param companyId - Şirket ID'si
 */
export const useConversationsByCompany = (companyId?: number) => {
  return useGet<ApiResponseConversations>(
    companyId ? API_ENDPOINTS.SUPPLY.CONVERSATIONS.BY_COMPANY(companyId) : null,
    {
      enabled: !!companyId,
    }
  );
};

// ========================
// HOOKS - MESSAGES
// ========================

/**
 * Mesaj gönderme hook'u
 */
export const useSendMessage = (conversationId: number) => {
  return usePost<ApiResponseMessage, MessageCreateDto>(
    API_ENDPOINTS.SUPPLY.MESSAGES.SEND(conversationId),
    {
      showSnackbar: true,
    }
  );
};

/**
 * Konuşmaya ait mesajları getirme hook'u
 */
export const useMessagesByConversation = (conversationId?: number) => {
  return useGet<ApiResponseMessages>(
    conversationId
      ? API_ENDPOINTS.SUPPLY.MESSAGES.BY_CONVERSATION(conversationId)
      : null,
    {
      enabled: !!conversationId,
    }
  );
};
