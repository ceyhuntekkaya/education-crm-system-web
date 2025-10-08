"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { PostDto } from "@/types/dto/content/PostDto";
import { SocialMediaContextType } from "../types";
import { mockSocialMediaPosts } from "../mock/social-media-mock-data";

// Create context
const SocialMediaContext = createContext<SocialMediaContextType | undefined>(
  undefined
);

// Provider component
export const SocialMediaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [posts] = useState<PostDto[]>(mockSocialMediaPosts);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<PostDto | null>(null);

  const refreshPosts = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const value: SocialMediaContextType = {
    posts,
    loading,
    selectedPost,
    setSelectedPost,
    refreshPosts,
  };

  return (
    <SocialMediaContext.Provider value={value}>
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
