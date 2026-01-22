"use client";

import React, { createContext, useContext } from "react";
import { useConversations } from "../hooks/use-conversations";
import { useConversationMessages } from "../hooks/use-messages";
import { useConversationCreator } from "../hooks/use-conversation-creator";
import type {
  MessagesContextValue,
  MessagesProviderProps,
} from "../types/context-types";

const MessagesContext = createContext<MessagesContextValue | undefined>(
  undefined,
);

/**
 * Messages Provider Component
 * Manages all conversations and messages for the messages page
 * Business logic delegated to custom hooks
 */
export const MessagesProvider: React.FC<MessagesProviderProps> = ({
  children,
}) => {
  const supplierId = 1; // TODO: Get from auth context

  // ============================================================================
  // CUSTOM HOOKS - Conversations Management
  // ============================================================================
  const {
    conversations,
    selectedConversationId,
    selectedConversation,
    isLoadingConversations,
    conversationsError,
    selectConversation,
    refetchConversations,
  } = useConversations(supplierId);

  // ============================================================================
  // CUSTOM HOOKS - Messages Management
  // ============================================================================
  const {
    messages,
    isLoadingMessages,
    messagesError,
    isSendingMessage,
    sendMessage,
  } = useConversationMessages(selectedConversationId, refetchConversations);

  // ============================================================================
  // CUSTOM HOOKS - Conversation Creation
  // ============================================================================
  const { isCreatingConversation, createNewConversation: createConversation } =
    useConversationCreator(supplierId, async (conversationId: number) => {
      await refetchConversations();
      selectConversation(conversationId);
    });

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================
  const contextValue: MessagesContextValue = {
    // Supplier & User Info
    supplierId,

    // Conversations
    conversations,
    isLoadingConversations,
    conversationsError,
    refetchConversations,

    // Selected Conversation
    selectedConversationId,
    selectedConversation,
    selectConversation,

    // Messages for Selected Conversation
    messages,
    isLoadingMessages,
    messagesError,

    // Sending Messages
    isSendingMessage,
    sendMessage,

    // Creating New Conversation
    isCreatingConversation,
    createNewConversation: createConversation,
  };

  return (
    <MessagesContext.Provider value={contextValue}>
      {children}
    </MessagesContext.Provider>
  );
};

/**
 * Hook to use Messages Context
 */
export const useMessages = (): MessagesContextValue => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
