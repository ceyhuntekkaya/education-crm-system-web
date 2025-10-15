"use client";

import React, { createContext, useContext } from "react";
import { usePostById } from "../hooks";
import { PostDetailContextValue, PostDetailProviderProps } from "../types";

const PostDetailContext = createContext<PostDetailContextValue | undefined>(
  undefined
);

export const PostDetailProvider: React.FC<PostDetailProviderProps> = ({
  children,
  postId,
}) => {
  const { post, isLoading, error, refetch } = usePostById(postId);

  const contextValue: PostDetailContextValue = {
    postId,
    post,
    isLoading,
    error,
    refetch,
  };

  return (
    <PostDetailContext.Provider value={contextValue}>
      {children}
    </PostDetailContext.Provider>
  );
};

/**
 * PostDetail context'ini kullanmak için hook
 */
export const usePostDetail = (): PostDetailContextValue => {
  const context = useContext(PostDetailContext);
  if (context === undefined) {
    throw new Error("usePostDetail must be used within a PostDetailProvider");
  }
  return context;
};
