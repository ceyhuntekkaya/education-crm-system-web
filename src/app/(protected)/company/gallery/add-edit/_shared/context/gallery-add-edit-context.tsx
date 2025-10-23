"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { GalleryAddEditContextType } from "../types";
import {
  useGalleryById,
  useAddGallery,
  useEditGallery,
  useGalleryOptions,
} from "../hooks";
import { isValidEditId, parseEditId } from "../utils";

const GalleryAddEditContext = createContext<
  GalleryAddEditContextType | undefined
>(undefined);

interface GalleryAddEditProviderProps {
  children: ReactNode;
}

export const GalleryAddEditProvider: React.FC<GalleryAddEditProviderProps> = ({
  children,
}) => {
  const params = useParams();
  const { id } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const galleryId = parseEditId(id);

  // Gallery data hook
  const {
    gallery,
    isLoading: galleryLoading,
    error: galleryError,
    refetch,
  } = useGalleryById(galleryId);

  // Add gallery hook
  const {
    postGallery,
    isLoading: addLoading,
    error: addError,
  } = useAddGallery();

  // Edit gallery hook - refetch'i props olarak geçir
  const {
    putGallery,
    isLoading: editLoading,
    error: editError,
  } = useEditGallery({
    galleryId: galleryId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  // Gallery options hook
  const { galleryTypeOptions, visibilityOptions } = useGalleryOptions();

  const contextValue: GalleryAddEditContextType = {
    // Current gallery data
    gallery,
    galleryLoading: galleryLoading || addLoading || editLoading,
    galleryError: galleryError || addError || editError,

    // Edit mode state
    isEditing,
    galleryId: galleryId?.toString() || null,

    // Form options
    galleryTypeOptions,
    visibilityOptions,

    // Actions
    fetchGallery: refetch,
    postGallery,
    putGallery,
  };

  return (
    <GalleryAddEditContext.Provider value={contextValue}>
      {children}
    </GalleryAddEditContext.Provider>
  );
};

export const useGalleryAddEdit = (): GalleryAddEditContextType => {
  const context = useContext(GalleryAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useGalleryAddEdit must be used within a GalleryAddEditProvider"
    );
  }
  return context;
};
