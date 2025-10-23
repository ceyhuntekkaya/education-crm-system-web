"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useParams } from "next/navigation";
import { GalleryAddEditContextType } from "../types";
import {
  useGalleryById,
  useAddGallery,
  useEditGallery,
  useGalleryOptions,
  useAddGalleryItem,
  useEditGalleryItem,
  useGalleryItemOptions,
  useGalleryItemSelection,
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

  // Gallery item selection hook
  const {
    selectedItem,
    isAddingNew,
    setSelectedItem,
    setIsAddingNew,
    handleItemSelect,
    handleAddNew,
    handleItemClick,
  } = useGalleryItemSelection();

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

  // Gallery Item hooks
  const {
    postGalleryItem,
    isLoading: addItemLoading,
    error: addItemError,
  } = useAddGalleryItem();

  const {
    putGalleryItem,
    isLoading: editItemLoading,
    error: editItemError,
  } = useEditGalleryItem({
    galleryItemId: selectedItem?.id || 0,
    refetch: isEditing ? refetch : undefined,
  });

  // Gallery item options hook
  const { mediaTypeOptions } = useGalleryItemOptions();

  const contextValue: GalleryAddEditContextType = {
    // Current gallery data
    gallery,
    galleryLoading: galleryLoading || addLoading || editLoading,
    galleryError: galleryError || addError || editError,

    // Edit mode state
    isEditing,
    galleryId: galleryId?.toString() || null,

    // Selected item state and handlers
    selectedItem,
    isAddingNew,
    setSelectedItem,
    setIsAddingNew,
    handleItemSelect,
    handleAddNew,
    handleItemClick,

    // Form options
    galleryTypeOptions,
    visibilityOptions,
    mediaTypeOptions,

    // Actions
    fetchGallery: refetch,
    postGallery,
    putGallery,

    // Gallery Item Actions
    postGalleryItem,
    putGalleryItem,
    galleryItemLoading: addItemLoading || editItemLoading,
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
