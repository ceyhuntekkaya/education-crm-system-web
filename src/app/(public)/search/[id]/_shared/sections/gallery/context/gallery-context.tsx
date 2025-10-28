"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useModal } from "@/hooks";
import { useInstitutionDetail } from "../../../contexts/institution-detail-context";
import { GalleryDto } from "@/types";
import { GallerySearchDto } from "@/types/dto/content/GallerySearchDto";

// Types
interface GalleryContextType {
  // Modal state
  isOpen: boolean;
  open: () => void;
  close: () => void;

  // Gallery state
  selectedGalleryId: number | null;
  setSelectedGalleryId: (id: number | null) => void;
  galleryData: GalleryDto[];
  loading: boolean;
  error: string | null;

  // Actions
  handleCardClick: (galleryId: number) => void;
  filterSubmit: (values: GallerySearchDto) => void;
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

  // Institution detail context'ten galleries verisini al
  const { galleries, loading, error } = useInstitutionDetail();

  // Galleries data'yı kullan (API'den gelen veri)
  const galleryData = galleries || [];

  const handleCardClick = (galleryId: number) => {
    setSelectedGalleryId(galleryId);
    open();
  };

  const filterSubmit = (values: GallerySearchDto) => {
    // TODO: Filtreleme mantığı burada implement edilecek
    // Şimdilik sadece console'a yazdırıyoruz
    console.log("Gallery filter values:", values);
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
    loading,
    error,

    // Actions
    handleCardClick,
    filterSubmit,
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
