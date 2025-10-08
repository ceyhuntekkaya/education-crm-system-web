"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { GalleryDto } from "@/types/dto/content/GalleryDto";
import { GalleryContextType } from "../types";
import { mockGalleries } from "../mock/gallery-mock-data";

// Create context
const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

// Provider component
export const GalleryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [galleries] = useState<GalleryDto[]>(mockGalleries);
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedGallery, setSelectedGallery] = useState<GalleryDto | null>(
    null
  );

  const refreshGalleries = useCallback(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const value: GalleryContextType = {
    galleries,
    loading,
    selectedGallery,
    setSelectedGallery,
    refreshGalleries,
  };

  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
};

// Hook to use gallery context
export const useGallery = (): GalleryContextType => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGallery must be used within a GalleryProvider");
  }
  return context;
};
