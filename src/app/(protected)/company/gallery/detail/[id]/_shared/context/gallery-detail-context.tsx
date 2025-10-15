"use client";

import React, { createContext, useContext } from "react";
import { useGalleryById } from "../hooks";
import {
  GalleryDetailContextValue,
  GalleryDetailProviderProps,
} from "../types";

const GalleryDetailContext = createContext<
  GalleryDetailContextValue | undefined
>(undefined);

export const GalleryDetailProvider: React.FC<GalleryDetailProviderProps> = ({
  children,
  galleryId,
}) => {
  const { gallery, isLoading, error, refetch } = useGalleryById(galleryId);

  const contextValue: GalleryDetailContextValue = {
    galleryId,
    gallery,
    isLoading,
    error,
    refetch,
  };

  return (
    <GalleryDetailContext.Provider value={contextValue}>
      {children}
    </GalleryDetailContext.Provider>
  );
};

/**
 * GalleryDetail context'ini kullanmak için hook
 */
export const useGalleryDetail = (): GalleryDetailContextValue => {
  const context = useContext(GalleryDetailContext);
  if (context === undefined) {
    throw new Error(
      "useGalleryDetail must be used within a GalleryDetailProvider"
    );
  }
  return context;
};
