"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { MessagesContextType } from "../types";
import { useSchoolMessages } from "../hooks";
import { useCompany } from "../../../_shared";

const MessagesContext = createContext<MessagesContextType | undefined>(
  undefined
);

interface MessagesProviderProps {
  children: ReactNode;
}

export const MessagesProvider: React.FC<MessagesProviderProps> = ({
  children,
}) => {
  // Company context'ten seçili Kurum ID'sini al
  const { selectedSchool } = useCompany();

  // Messages hook'unu kullan - selectedSchool'un ID'sini kullan
  const { schoolMessages, messagesLoading, messagesError, refetchMessages } =
    useSchoolMessages(selectedSchool?.id);

  const contextValue: MessagesContextType = {
    schoolMessages,
    messagesLoading,
    messagesError,
    refetchMessages: refetchMessages,
  };

  return (
    <MessagesContext.Provider value={contextValue}>
      {children}
    </MessagesContext.Provider>
  );
};

// Hook to use messages context
export const useMessages = (): MessagesContextType => {
  const context = useContext(MessagesContext);
  if (context === undefined) {
    throw new Error("useMessages must be used within a MessagesProvider");
  }
  return context;
};
