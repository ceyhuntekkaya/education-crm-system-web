"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { CampaignsContextType } from "../types";

const CampaignsContext = createContext<CampaignsContextType | undefined>(
  undefined
);

export const CampaignsProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const value: CampaignsContextType = {
    // Context implementation will be added here
  };

  return (
    <CampaignsContext.Provider value={value}>
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
