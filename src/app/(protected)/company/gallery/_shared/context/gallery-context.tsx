"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { GalleryContextType } from "../types";
import { useSchoolGalleries } from "../hooks";
import { useCompany } from "../../../_shared";

const GalleryContext = createContext<GalleryContextType | undefined>(undefined);

interface GalleryProviderProps {
  children: ReactNode;
}

export const GalleryProvider: React.FC<GalleryProviderProps> = ({
  children,
}) => {
  // Company context'ten seçili okul ID'sini al
  const { selectedSchool } = useCompany();

  // Galleries hook'unu kullan
  const {
    schoolGalleries,
    galleriesLoading,
    galleriesError,
    refetchGalleries,
  } = useSchoolGalleries(selectedSchool?.id || null);

  const contextValue: GalleryContextType = {
    schoolGalleries,
    galleriesLoading,
    galleriesError,
    refetchGalleries: refetchGalleries,
  };

  return (
    <GalleryContext.Provider value={contextValue}>
      {children}
    </GalleryContext.Provider>
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
