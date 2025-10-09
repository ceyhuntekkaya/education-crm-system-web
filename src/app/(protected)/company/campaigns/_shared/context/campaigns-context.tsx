"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CampaignsContextType } from "../types";
import { useActiveCampaigns } from "../hooks";

const CampaignsContext = createContext<CampaignsContextType | undefined>(
  undefined
);

interface CampaignsProviderProps {
  children: ReactNode;
}

export const CampaignsProvider: React.FC<CampaignsProviderProps> = ({
  children,
}) => {
  // Active campaigns hook'unu kullan
  const {
    activeCampaigns,
    campaignsLoading,
    campaignsError,
    refetchCampaigns,
  } = useActiveCampaigns();

  const contextValue: CampaignsContextType = {
    activeCampaigns,
    campaignsLoading,
    campaignsError,
    refetchCampaigns,
  };

  return (
    <CampaignsContext.Provider value={contextValue}>
      {children}
    </CampaignsContext.Provider>
  );
};

export const useCampaigns = (): CampaignsContextType => {
  const context = useContext(CampaignsContext);
  if (context === undefined) {
    throw new Error("useCampaigns must be used within a CampaignsProvider");
  }
  return context;
};
