"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useModal } from "@/hooks";
import { postSummaryMockData } from "../mock/postSummaryMockData";
import { postMockData } from "../mock";
import { PostSearchDto } from "@/types/dto/content";

// Types
interface PostContextType {
  // Modal state
  isOpen: boolean;
  open: () => void;
  close: () => void;

  // Post state
  selectedPostId: number | null;
  setSelectedPostId: (id: number | null) => void;
  postData: typeof postSummaryMockData;
  selectedPost: any | null;

  // Utility function to get post by ID
  getPostById: (
    id: number | undefined
  ) => (typeof postSummaryMockData)[0] | null;

  // Actions
  handleCardClick: (postId: number) => void;
  handleViewAllClick: () => void;

  // Filter action
  filterSubmit: (filters: PostSearchDto) => void;
}

interface PostProviderProps {
  children: ReactNode;
}

// Context
const PostContext = createContext<PostContextType | undefined>(undefined);

// Provider
export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
  const { isOpen, open, close } = useModal();
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);

  // Institution ID'ye göre filtreleme yapabiliriz (şimdilik tüm data'yı gösteriyoruz)
  const postData = postSummaryMockData; // Tüm postları göster

  // Utility function to get post by ID
  const getPostById = (id: number | undefined) => {
    if (!id) return null;
    return postData.find((post) => post.id === id) || null;
  };

  const handleCardClick = (postId: number) => {
    setSelectedPostId(postId);
    // Set selected post when card is clicked
    const post = postMockData.find((p) => p.id === postId);
    setSelectedPost(post || null);
    open();
  };

  // Custom close function that also clears selected post
  const handleModalClose = () => {
    setSelectedPost(null);
    setSelectedPostId(null);
    close();
  };

  const handleViewAllClick = () => {
    console.log("View all posts clicked");
    // Burada tüm postları göster sayfasına yönlendirme yapılabilir
  };

  // Filter function
  const filterSubmit = (filters: PostSearchDto) => {
    console.log("Post Filters Submitted:", filters);
    // TODO: Implement filter logic (API call, state update, etc.)
  };

  const value: PostContextType = {
    // Modal state
    isOpen,
    open,
    close: handleModalClose,

    // Post state
    selectedPostId,
    setSelectedPostId,
    postData,
    selectedPost,

    // Utility function
    getPostById,

    // Actions
    handleCardClick,
    handleViewAllClick,

    // Filter action
    filterSubmit,
  };
  return <PostContext.Provider value={value}>{children}</PostContext.Provider>;
};

// Hook
export const usePostContext = () => {
  const context = useContext(PostContext);
  if (context === undefined) {
    throw new Error("usePostContext must be used within a PostProvider");
  }
  return context;
};
