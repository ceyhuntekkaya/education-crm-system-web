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

  const refreshMessages = useCallback(() => {
    refetchMessages();
  }, [refetchMessages]);

  const handleMessageSelect = useCallback((message: MessageDto) => {
    setSelectedMessage(message);
  }, []);

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
    messages,
    loading: messageLoading,
    error: messageError,
    // @ts-ignore
    conversationGroups,
    selectedMessage,
    setSelectedMessage: handleSetSelectedMessage,
    detailModal,
    infoModal,
    stats,
    statsData,
    handlers,
    filters,
    setFilters: handleSetFilters,
    refreshMessages,
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
