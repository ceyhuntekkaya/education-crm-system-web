"use client";

import { useState, useMemo } from "react";
import { useMessagesByConversation } from "./api";
import { apiClient } from "@/lib/api";
import type { MessageDto, MessageCreateDto } from "@/types/dto/supply";

/**
 * Hook for managing messages in a conversation
 */
export const useConversationMessages = (
  selectedConversationId: number | null,
  onMessageSent?: () => Promise<void>
) => {
  const [isSendingMessage, setIsSendingMessage] = useState(false);

  // Fetch messages
  const {
    data: messagesData,
    loading: isLoadingMessages,
    error: messagesError,
    refetch: refetchMessages,
  } = useMessagesByConversation(selectedConversationId || undefined);

  // Computed values
  const messages = useMemo<MessageDto[]>(
    () => messagesData?.data?.content || [],
    [messagesData]
  );

  /**
   * Send a message in the current conversation
   */
  const sendMessage = async (content: string): Promise<boolean> => {
    const trimmedContent = content.trim();

    // Validation
    if (!trimmedContent) {
      console.error("❌ Mesaj boş");
      return false;
    }

    if (trimmedContent.length < 1 || trimmedContent.length > 1000) {
      console.error("❌ Mesaj 1-1000 karakter olmalı");
      return false;
    }

    if (!selectedConversationId) {
      console.error("❌ Konuşma seçilmedi");
      return false;
    }

    setIsSendingMessage(true);

    try {
      console.log("📤 Mesaj gönderiliyor...", {
        conversationId: selectedConversationId,
        length: trimmedContent.length,
      });

      const messageData: MessageCreateDto = {
        content: trimmedContent,
      };

      const messageResponse = await apiClient.post(
        `/supply/conversations/${selectedConversationId}/messages`,
        messageData
      );

      console.log("✅ Mesaj gönderildi:", messageResponse.data);

      // Refetch messages and notify parent
      await refetchMessages();
      if (onMessageSent) {
        await onMessageSent();
      }

      return true;
    } catch (error: any) {
      console.error("❌ Mesaj gönderilemedi:", {
        message: error?.message,
        status: error?.response?.status,
        data: error?.response?.data,
      });
      return false;
    } finally {
      setIsSendingMessage(false);
    }
  };

  return {
    // Data
    messages,

    // Loading & Error
    isLoadingMessages,
    messagesError: messagesError || null,

    // Actions
    isSendingMessage,
    sendMessage,
    refetchMessages,
  };
};
