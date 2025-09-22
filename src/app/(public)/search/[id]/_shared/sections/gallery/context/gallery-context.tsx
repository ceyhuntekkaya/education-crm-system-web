"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useModal } from "@/hooks";
import { gallerySummaryMockData } from "../mock";

// Types
interface GalleryContextType {
  // Modal state
  isOpen: boolean;
  open: () => void;
  close: () => void;

  // Gallery state
  selectedGalleryId: number | null;
  setSelectedGalleryId: (id: number | null) => void;
  galleryData: typeof gallerySummaryMockData;

  // Actions
  handleCardClick: (galleryId: number) => void;
  handleViewAllClick: () => void;
}

interface GalleryProviderProps {
  children: ReactNode;
}

// Context
const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

// Provider
export const GalleryProvider: React.FC<GalleryProviderProps> = ({
  children,
}) => {
  const { isOpen, open, close } = useModal();
  const [selectedGalleryId, setSelectedGalleryId] = useState<number | null>(
    null
  );

  // Institution ID'ye göre filtreleme yapabiliriz (şimdilik tüm data'yı gösteriyoruz)
  const galleryData = gallerySummaryMockData; // Tüm galerileri göster

  const handleCardClick = (galleryId: number) => {
    setSelectedGalleryId(galleryId);
    open();
  };

  const handleViewAllClick = () => {
    console.log("View all galleries clicked");
    // Burada tüm galerileri göster sayfasına yönlendirme yapılabilir
  };

  const value: GalleryContextType = {
    // Modal state
    isOpen,
    open,
    close,

    // Gallery state
    selectedGalleryId,
    setSelectedGalleryId,
    galleryData,

    // Actions
    handleCardClick,
    handleViewAllClick,
  };
  return (
    <GalleryContext.Provider value={value}>{children}</GalleryContext.Provider>
  );
};

// Hook
export const useGalleryContext = () => {
  const context = useContext(GalleryContext);
  if (context === undefined) {
    throw new Error("useGalleryContext must be used within a GalleryProvider");
  }
  return context;
};
