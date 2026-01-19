"use client";

import React, { createContext, useContext } from "react";
import {
  useConversations,
  useConversationMessages,
  useConversationCreator,
} from "../hooks";
import type {
  MessagesContextValue,
  MessagesProviderProps,
} from "../types/context-types";

const MessagesContext = createContext<MessagesContextValue | undefined>(
  undefined
);

/**
 * Messages Provider Component
 * Manages all conversations and messages for the messages page
 * Business logic delegated to custom hooks
 */
export const MessagesProvider: React.FC<MessagesProviderProps> = ({
  children,
}) => {
  const companyId = 1; // TODO: Get from auth context

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
  } = useConversations(companyId);

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
    useConversationCreator(companyId, async (conversationId) => {
      await refetchConversations();
      selectConversation(conversationId);
    });

  // ============================================================================
  // CONTEXT VALUE
  // ============================================================================
  const contextValue: MessagesContextValue = {
    // Company & User Info
    companyId,

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
