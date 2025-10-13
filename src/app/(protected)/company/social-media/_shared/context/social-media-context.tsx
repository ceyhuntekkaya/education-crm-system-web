"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { SocialMediaContextType } from "../types";
import { useSchoolPosts } from "../hooks";
import { useCompany } from "../../../_shared";

const SocialMediaContext = createContext<SocialMediaContextType | undefined>(
  undefined
);

interface SocialMediaProviderProps {
  children: ReactNode;
}

export const SocialMediaProvider: React.FC<SocialMediaProviderProps> = ({
  children,
}) => {
  // Company context'ten seçili okul ID'sini al
  const { selectedSchool } = useCompany();

  // Posts hook'unu kullan
  const { schoolPosts, postsLoading, postsError, refetchPosts } =
    useSchoolPosts(selectedSchool?.id || null);

  const contextValue: SocialMediaContextType = {
    schoolPosts,
    postsLoading,
    postsError,
    refetchPosts: refetchPosts,
  };

  return (
    <SocialMediaContext.Provider value={contextValue}>
      {children}
    </SocialMediaContext.Provider>
  );
};

// Hook to use social media context
export const useSocialMedia = (): SocialMediaContextType => {
  const context = useContext(SocialMediaContext);
  if (context === undefined) {
    throw new Error("useSocialMedia must be used within a SocialMediaProvider");
  }
  return context;
};
