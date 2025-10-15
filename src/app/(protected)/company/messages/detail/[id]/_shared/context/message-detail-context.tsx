"use client";

import React, { createContext, useContext } from "react";
import { useMessageById } from "../hooks";
import {
  MessageDetailContextValue,
  MessageDetailProviderProps,
} from "../types";

const MessageDetailContext = createContext<
  MessageDetailContextValue | undefined
>(undefined);

export const MessageDetailProvider: React.FC<MessageDetailProviderProps> = ({
  children,
  messageId,
}) => {
  const { message, isLoading, error, refetch } = useMessageById(messageId);

  const contextValue: MessageDetailContextValue = {
    messageId,
    message,
    isLoading,
    error,
    refetch,
  };

  return (
    <MessageDetailContext.Provider value={contextValue}>
      {children}
    </MessageDetailContext.Provider>
  );
};

/**
 * MessageDetail context'ini kullanmak için hook
 */
export const useMessageDetail = (): MessageDetailContextValue => {
  const context = useContext(MessageDetailContext);
  if (context === undefined) {
    throw new Error(
      "useMessageDetail must be used within a MessageDetailProvider"
    );
  }
  return context;
};
