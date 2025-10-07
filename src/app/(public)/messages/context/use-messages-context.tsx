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
  // State management
  const [filters, setFilters] = useState<MessageFilters>(initialFilters);
  const [selectedMessage, setSelectedMessage] = useState<MessageDto | null>(
    null
  );

  // Modal hooks
  const detailModal = useModal();
  const infoModal = useModal();

  // Data hooks
  const { messages, loading, error, refetch } = useMessages(filters);
  const { stats, statsData } = useMessageStatistics(messages);

  // Actions
  const refreshMessages = useCallback(() => {
    refetch();
  }, [refetch]);

  const handlers = useMessageHandlers({
    setSelectedMessage,
    detailModal,
    refreshMessages,
  });

  const handleSetFilters = useCallback((newFilters: MessageFilters) => {
    setFilters((prev: MessageFilters) => ({ ...prev, ...newFilters }));
  }, []);

  const handleSetSelectedMessage = useCallback((message: MessageDto | null) => {
    setSelectedMessage(message);
  }, []);

  const contextValue: MessageContextType = {
    // Data
    messages,
    loading,
    error,

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
