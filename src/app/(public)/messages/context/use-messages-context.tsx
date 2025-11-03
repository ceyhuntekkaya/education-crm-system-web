"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import {
  useMessages,
  useMessageHandlers,
  useMessageStatistics,
  // useMarkMessageAsRead, // TEMPORARILY DISABLED
} from "../hooks";
import { useModal } from "@/hooks";
import { useAuth } from "@/contexts";
import { MessageContextType, MessageFilters } from "../types";

const MessageContext = createContext<MessageContextType | undefined>(undefined);

interface MessageProviderProps {
  children: ReactNode;
  initialFilters?: MessageFilters;
}

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
  initialFilters = { limit: 50 },
}) => {
  // Auth context
  const { user } = useAuth();

  // State management
  const [filters, setFilters] = useState<MessageFilters>(initialFilters);
  const [selectedMessage, setSelectedMessage] = useState<MessageDto | null>(
    null
  );

  // Modal hooks
  const detailModal = useModal();
  const infoModal = useModal();

  // Data hooks (API returns conversation groups)
  const { conversationGroups, messageLoading, messageError, refetchMessages } =
    useMessages({
      userId: user?.id,
      enabled: !!user?.id,
    });

  // Flatten conversations for compatibility with existing types/consumers
  const messages = React.useMemo(() => {
    return (conversationGroups?.flatMap((g) => g.conversations) ??
      []) as MessageDto[];
  }, [conversationGroups]);

  const { stats, statsData } = useMessageStatistics(messages);

  // Mark as read hook - TEMPORARILY DISABLED
  // const { markAsRead, markingAsRead } = useMarkMessageAsRead();

  // Actions
  const refreshMessages = useCallback(() => {
    refetchMessages();
  }, [refetchMessages]);

  // Handle message selection (mark as read DISABLED)
  const handleMessageSelect = useCallback(
    async (message: MessageDto) => {
      setSelectedMessage(message);

      // TEMPORARILY DISABLED: Auto mark as read
      // Mesaj henüz okunmadıysa (status !== "READ"), okundu olarak işaretle
      // if (message.id && message.status !== "READ") {
      //   try {
      //     await markAsRead(message.id);
      //     // Mesajları yenile
      //     refetchMessages();
      //   } catch (error) {
      //     console.error("Mesaj okundu olarak işaretlenemedi:", error);
      //   }
      // }
    },
    [] // No dependencies needed when mark as read is disabled
  );

  const handlers = useMessageHandlers({
    setSelectedMessage: handleMessageSelect,
    detailModal,
    refreshMessages,
  });

  const handleSetFilters = useCallback((newFilters: MessageFilters) => {
    setFilters((prev: MessageFilters) => ({ ...prev, ...newFilters }));
  }, []);

  const handleSetSelectedMessage = useCallback(
    (message: MessageDto | null) => {
      if (message) {
        handleMessageSelect(message);
      } else {
        setSelectedMessage(null);
      }
    },
    [handleMessageSelect]
  );

  const contextValue: MessageContextType = {
    // Data
    messages,
    loading: messageLoading, // markingAsRead removed (mark as read disabled)
    error: messageError,

    // Expose groups as well for conversation-style UI
    // (not part of the original type but helpful internally)
    // @ts-ignore
    conversationGroups,

    // Selected message
    selectedMessage,
    setSelectedMessage: handleSetSelectedMessage,

    // Modal
    detailModal,

    // Info Modal
    infoModal,

    // Statistics
    stats,
    statsData,

    // Handlers
    handlers,

    // Filters
    filters,
    setFilters: handleSetFilters,

    // Actions
    refreshMessages,

    // Mark as read - TEMPORARILY DISABLED
    // markAsRead,
  };

  return (
    <MessageContext.Provider value={contextValue}>
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to use message context
export const useMessageContext = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
};
