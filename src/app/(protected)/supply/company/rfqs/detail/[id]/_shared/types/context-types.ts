import React from "react";
import type { RFQDto, ApiResponseDto } from "@/types";
import type { MutationOptions } from "@/hooks/api";

// Supply message/conversation types
interface MessageDto {
  id: number;
  conversationId: number;
  senderId: number;
  senderName?: string;
  content: string;
  isRead: boolean;
  createdAt: string;
}

interface ConversationDto {
  id: number;
  companyId: number;
  supplierId?: number;
  rfqId?: number;
  productId?: number;
  subject: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * RFQ detail context için interface'ler
 */
export interface RFQDetailContextValue {
  rfqId: number;
  rfq: RFQDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
  hasValidId: boolean;
  // RFQ Actions - Direkt mutate fonksiyonları
  publishRFQ: (
    data: Record<string, never>,
    mutationOptions?: MutationOptions<
      ApiResponseDto<RFQDto>,
      Record<string, never>
    >
  ) => Promise<ApiResponseDto<RFQDto> | null>;
  closeRFQ: (
    data: Record<string, never>,
    mutationOptions?: MutationOptions<
      ApiResponseDto<RFQDto>,
      Record<string, never>
    >
  ) => Promise<ApiResponseDto<RFQDto> | null>;
  cancelRFQ: (
    data: Record<string, never>,
    mutationOptions?: MutationOptions<
      ApiResponseDto<RFQDto>,
      Record<string, never>
    >
  ) => Promise<ApiResponseDto<RFQDto> | null>;
  // Action loading states
  isPublishing: boolean;
  isClosing: boolean;
  isCancelling: boolean;
  // Messaging functionality
  conversationId: number | null;
  existingConversation: ConversationDto | null;
  isCheckingConversation: boolean;
  conversationsError: string | null;
  refetchConversations: () => void;
  isSendingMessage: boolean;
  sendMessage: (content: string) => Promise<boolean>;
  messages: MessageDto[];
  isLoadingMessages: boolean;
  companyId: number;
}

export interface RFQDetailProviderProps {
  children: React.ReactNode;
  rfqId: number;
}
