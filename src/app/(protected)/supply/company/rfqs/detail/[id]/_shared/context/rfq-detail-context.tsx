"use client";

import React, { createContext, useContext, useState, useMemo } from "react";
import { useRFQById, useRFQActions } from "../../../../_shared/hooks/api";
import { RFQDetailContextValue, RFQDetailProviderProps } from "../types";
import { apiClient } from "@/lib/api";

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

const RFQDetailContext = createContext<RFQDetailContextValue | undefined>(
  undefined
);

export const RFQDetailProvider: React.FC<RFQDetailProviderProps> = ({
  children,
  rfqId,
}) => {
  const { rfq, isLoading, error, refetch } = useRFQById(rfqId);
  const {
    publishRFQ,
    closeRFQ,
    cancelRFQ,
    isPublishing,
    isClosing,
    isCancelling,
  } = useRFQActions(rfqId);

  const hasValidId = rfqId > 0;

  // Messaging state
  const companyId = 1; // TODO: Auth context'ten al
  const [conversationId, setConversationId] = useState<number | null>(null);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);
  const [conversations, setConversations] = useState<ConversationDto[]>([]);
  const [isCheckingConversation, setIsCheckingConversation] = useState(false);
  const [conversationsError, setConversationsError] = useState<string | null>(
    null
  );

  // Fetch conversations on mount
  React.useEffect(() => {
    if (rfqId > 0) {
      fetchConversations();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rfqId]);

  // Fetch messages when conversationId changes
  React.useEffect(() => {
    if (conversationId) {
      fetchMessages();
    } else {
      setMessages([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversationId]);

  const fetchConversations = async () => {
    setIsCheckingConversation(true);
    setConversationsError(null);
    try {
      const response = await apiClient.get<{
        data?: { content?: ConversationDto[] };
      }>(`/supply/conversations?rfqId=${rfqId}`);
      const convList = response.data?.data?.content || [];
      setConversations(convList);

      // Find existing conversation for this RFQ
      const existingConv = convList.find(
        (conv: ConversationDto) =>
          conv.rfqId === rfqId && conv.companyId === companyId
      );

      if (existingConv?.id) {
        setConversationId(existingConv.id);
      }
    } catch (err: any) {
      setConversationsError(err.message || "Konuşmalar yüklenemedi");
      console.error("Konuşmalar yüklenemedi:", err);
    } finally {
      setIsCheckingConversation(false);
    }
  };

  const fetchMessages = async () => {
    if (!conversationId) return;

    setIsLoadingMessages(true);
    try {
      const response = await apiClient.get<{
        data?: { content?: MessageDto[] };
      }>(`/supply/conversations/${conversationId}/messages`);
      setMessages(response.data?.data?.content || []);
    } catch (err) {
      console.error("Mesajlar yüklenemedi:", err);
    } finally {
      setIsLoadingMessages(false);
    }
  };

  const sendMessage = async (content: string): Promise<boolean> => {
    const trimmedContent = content.trim();

    if (!trimmedContent) {
      console.error("❌ Mesaj boş");
      return false;
    }

    if (trimmedContent.length < 1 || trimmedContent.length > 1000) {
      console.error("❌ Mesaj 1-1000 karakter olmalı");
      return false;
    }

    setIsSendingMessage(true);

    try {
      let currentConversationId = conversationId;

      // Create conversation if doesn't exist
      if (!currentConversationId) {
        console.log("📝 Yeni conversation oluşturuluyor...");

        const createResponse = await apiClient.post<{
          data?: { id?: number };
        }>(`/supply/conversations`, {
          companyId,
          rfqId,
          subject: `${rfq?.title || "RFQ"} hakkında`,
          messageType: "RFQ_INQUIRY",
        });

        currentConversationId = createResponse.data?.data?.id || null;

        if (!currentConversationId) {
          throw new Error("Conversation oluşturulamadı");
        }

        console.log("✅ Conversation oluşturuldu:", currentConversationId);
        setConversationId(currentConversationId);
        await fetchConversations();
      }

      // Send message
      console.log("📤 Mesaj gönderiliyor...");

      await apiClient.post(
        `/supply/conversations/${currentConversationId}/messages`,
        {
          conversationId: currentConversationId,
          senderId: companyId,
          content: trimmedContent,
        }
      );

      console.log("✅ Mesaj gönderildi");

      // Refresh messages
      await fetchMessages();

      setIsSendingMessage(false);
      return true;
    } catch (err) {
      console.error("❌ Mesaj gönderilemedi:", err);
      setIsSendingMessage(false);
      return false;
    }
  };

  const existingConversation = useMemo(
    () =>
      conversations.find(
        (conv) => conv.rfqId === rfqId && conv.companyId === companyId
      ) || null,
    [conversations, rfqId, companyId]
  );

  const contextValue: RFQDetailContextValue = {
    rfqId,
    rfq,
    isLoading,
    error,
    refetch,
    hasValidId,
    // RFQ Actions
    publishRFQ,
    closeRFQ,
    cancelRFQ,
    isPublishing,
    isClosing,
    isCancelling,
    // Messaging
    conversationId,
    existingConversation,
    isCheckingConversation,
    conversationsError,
    refetchConversations: fetchConversations,
    isSendingMessage,
    sendMessage,
    messages,
    isLoadingMessages,
    companyId,
  };

  return (
    <RFQDetailContext.Provider value={contextValue}>
      {children}
    </RFQDetailContext.Provider>
  );
};

/**
 * RFQDetail context'ini kullanmak için hook
 */
export const useRFQDetail = (): RFQDetailContextValue => {
  const context = useContext(RFQDetailContext);
  if (context === undefined) {
    throw new Error("useRFQDetail must be used within a RFQDetailProvider");
  }
  return context;
};
