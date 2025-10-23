"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { PostAddEditContextType } from "../types";
import { usePostById, useAddPost, useEditPost, usePostOptions } from "../hooks";
import { isValidEditId, parseEditId } from "../utils";

const PostAddEditContext = createContext<PostAddEditContextType | undefined>(
  undefined
);

interface PostAddEditProviderProps {
  children: ReactNode;
}

export const PostAddEditProvider: React.FC<PostAddEditProviderProps> = ({
  children,
}) => {
  const params = useParams();
  const { id } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const postId = parseEditId(id);

  // Post data hook
  const {
    post,
    isLoading: postLoading,
    error: postError,
    refetch,
  } = usePostById(postId);

  // Add post hook
  const { postPost, isLoading: addLoading, error: addError } = useAddPost();

  // Edit post hook - refetch'i props olarak geçir
  const {
    putPost,
    isLoading: editLoading,
    error: editError,
  } = useEditPost({
    postId: postId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  // Post options hook
  const { postTypeOptions, postStatusOptions } = usePostOptions();

  const contextValue: PostAddEditContextType = {
    // Current post data
    post,
    postLoading: postLoading || addLoading || editLoading,
    postError: postError || addError || editError,

    // Edit mode state
    isEditing,
    postId: postId?.toString() || null,

    // Form options
    postTypeOptions,
    postStatusOptions,

    // Actions
    fetchPost: refetch,
    postPost,
    putPost,
  };

  return (
    <PostAddEditContext.Provider value={contextValue}>
      {children}
    </PostAddEditContext.Provider>
  );
};

export const usePostAddEdit = (): PostAddEditContextType => {
  const context = useContext(PostAddEditContext);
  if (context === undefined) {
    throw new Error("usePostAddEdit must be used within a PostAddEditProvider");
  }
  return context;
};
