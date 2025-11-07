"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useMemo,
} from "react";
import { MessageDto } from "@/types/dto/content/MessageDto";
import { MessageConversationGroupDto } from "@/types/dto/content/MessageConversationDto";
import { useMessages, useMessageStatistics } from "../hooks";
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

  // State management
  const [filters, setFilters] = useState<MessageFilters>(initialFilters);
  const [selectedConversation, setSelectedConversation] =
    useState<MessageConversationGroupDto | null>(null);

  // Data hooks (API returns conversation groups)
  const { conversationGroups, messageLoading, messageError, refetchMessages } =
    useMessages();

  // Flatten conversations for compatibility with existing types/consumers
  const messages = React.useMemo(() => {
    return (conversationGroups?.flatMap((g) => g.conversations) ??
      []) as MessageDto[];
  }, [conversationGroups]);

  // Custom stats calculation
  const customStats = useMemo(
    () => ({
      total: messages.length,
      unread: messages.filter(
        (m) => m.status === "NEW" || m.status === "IN_PROGRESS"
      ).length,
      urgent: messages.filter(
        (m) => m.priority === "URGENT" || m.priority === "CRITICAL"
      ).length,
    }),
    [messages]
  );

  const { stats, statsData } = useMessageStatistics(messages);

  const refreshMessages = useCallback(() => {
    refetchMessages();
  }, [refetchMessages]);

  const handleSetFilters = useCallback((newFilters: MessageFilters) => {
    setFilters((prev: MessageFilters) => ({ ...prev, ...newFilters }));
  }, []);

  const handleSelectConversation = useCallback(
    (conversation: MessageConversationGroupDto | null) => {
      setSelectedConversation(conversation);
    },
    []
  );

  // Handle message selection - finds and sets the conversation group
  const handleSelectMessage = useCallback(
    (message: MessageDto) => {
      const group = conversationGroups?.find((g: MessageConversationGroupDto) =>
        g.conversations.some((conv) => conv.id === message.id)
      );
      if (group) {
        setSelectedConversation(group);
      }
    },
    [conversationGroups]
  );

  // Computed values for conversation selection
  const selectedMessageId = selectedConversation?.userId || null;

  const contextValue: MessageContextType = {
    messages,
    conversationGroups,
    loading: messageLoading,
    error: messageError,
    selectedConversation,
    selectedMessageId,
    setSelectedConversation: handleSelectConversation,
    handleSelectMessage,
    customStats,
    stats,
    statsData,
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
