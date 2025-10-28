"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useModal } from "@/hooks";
import { useInstitutionDetail } from "../../../contexts/institution-detail-context";
import { PostDto } from "@/types";
import { PostSearchDto } from "@/types/dto/content/PostSearchDto";

// Types
interface PostContextType {
  // Modal state
  isOpen: boolean;
  open: () => void;
  close: () => void;

  // Post state
  selectedPostId: number | null;
  setSelectedPostId: (id: number | null) => void;
  postData: PostDto[];
  selectedPost: PostDto | null;
  loading: boolean;
  error: string | null;

  // Utility function to get post by ID
  getPostById: (id: number | undefined) => PostDto | null;

  // Actions
  handleCardClick: (postId: number) => void;
  filterSubmit: (values: PostSearchDto) => void;
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
  const [selectedPost, setSelectedPost] = useState<PostDto | null>(null);

  // Institution detail context'ten posts verisini al
  const { posts, loading, error } = useInstitutionDetail();

  // Posts data'yı kullan (API'den gelen veri)
  const postData = posts || [];

  // Utility function to get post by ID
  const getPostById = (id: number | undefined): PostDto | null => {
    if (!id) return null;
    return postData.find((post) => post.id === id) || null;
  };

  const handleCardClick = (postId: number) => {
    setSelectedPostId(postId);
    // Set selected post when card is clicked
    const post = postData.find((p) => p.id === postId);
    setSelectedPost(post || null);
    open();
  };

  // Custom close function that also clears selected post
  const handleModalClose = () => {
    setSelectedPost(null);
    setSelectedPostId(null);
    close();
  };

  const filterSubmit = (values: PostSearchDto) => {
    // TODO: Filtreleme mantığı burada implement edilecek
    // Şimdilik sadece console'a yazdırıyoruz
    console.log("Post filter values:", values);
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
    loading,
    error,

    // Utility function
    getPostById,

    // Actions
    handleCardClick,
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
