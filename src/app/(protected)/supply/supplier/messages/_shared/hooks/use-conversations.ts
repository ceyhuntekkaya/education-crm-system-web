"use client";

import { useState, useMemo } from "react";
import { useConversationsBySupplier } from "./api/use-messages-api";
import type {
  ConversationDto,
  ApiResponsePageConversationDto,
} from "@/types/dto/supply";

/**
 * Hook for managing conversations list and selection
 */
export const useConversations = (supplierId: number) => {
  const [selectedConversationId, setSelectedConversationId] = useState<
    number | null
  >(null);

  // Fetch conversations
  const {
    data: conversationsData,
    loading: isLoadingConversations,
    error: conversationsError,
    refetch: refetchConversations,
  } = useConversationsBySupplier(supplierId, {
    onSuccess: (data: ApiResponsePageConversationDto) => {
      console.log("📬 Konuşmalar yüklendi:", {
        total: data.data?.content?.length,
        supplierId,
      });
    },
    onError: (error: string) => {
      console.error("❌ Konuşmalar yüklenemedi:", error);
    },
  });

  // Computed values
  const conversations = useMemo<ConversationDto[]>(
    () => conversationsData?.data?.content || [],
    [conversationsData],
  );

  const selectedConversation = useMemo<ConversationDto | null>(() => {
    if (!selectedConversationId || conversations.length === 0) return null;
    return (
      conversations.find((conv) => conv.id === selectedConversationId) || null
    );
  }, [selectedConversationId, conversations]);

  // Handlers
  const selectConversation = (conversationId: number | null) => {
    console.log("📌 Konuşma seçildi:", conversationId);
    setSelectedConversationId(conversationId);
  };

  const handleRefetchConversations = async (): Promise<void> => {
    await refetchConversations();
  };

  return {
    // Data
    conversations,
    selectedConversationId,
    selectedConversation,

    // Loading & Error
    isLoadingConversations,
    conversationsError: conversationsError || null,

    // Actions
    selectConversation,
    refetchConversations: handleRefetchConversations,
  };
};
