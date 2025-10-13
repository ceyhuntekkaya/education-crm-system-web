"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CampaignsContextType } from "../types";
import { useSchoolCampaigns } from "../hooks";
import { useCompany } from "../../../_shared";

const CampaignsContext = createContext<CampaignsContextType | undefined>(
  undefined
);

interface CampaignsProviderProps {
  children: ReactNode;
}

export const CampaignsProvider: React.FC<CampaignsProviderProps> = ({
  children,
}) => {
  // Company context'ten seçili okul bilgisini al
  const { selectedSchool } = useCompany();

  // School campaigns hook'unu kullan
  const {
    schoolCampaigns,
    campaignsLoading,
    campaignsError,
    refetchCampaigns,
  } = useSchoolCampaigns(selectedSchool?.id || null);

  const contextValue: CampaignsContextType = {
    campaigns: schoolCampaigns,
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
