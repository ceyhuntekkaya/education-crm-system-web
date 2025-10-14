"use client";

import React, { createContext, useContext } from "react";
import { useCampaignById } from "../hooks";
import {
  CampaignDetailContextValue,
  CampaignDetailProviderProps,
} from "../types";

const CampaignDetailContext = createContext<
  CampaignDetailContextValue | undefined
>(undefined);

export const CampaignDetailProvider: React.FC<CampaignDetailProviderProps> = ({
  children,
  campaignId,
}) => {
  const { campaign, isLoading, error, refetch } = useCampaignById(campaignId);

  const contextValue: CampaignDetailContextValue = {
    campaignId,
    campaign,
    isLoading,
    error,
    refetch,
  };

  return (
    <CampaignDetailContext.Provider value={contextValue}>
      {children}
    </CampaignDetailContext.Provider>
  );
};

/**
 * CampaignDetail context'ini kullanmak için hook
 */
export const useCampaignDetail = (): CampaignDetailContextValue => {
  const context = useContext(CampaignDetailContext);
  if (context === undefined) {
    throw new Error(
      "useCampaignDetail must be used within a CampaignDetailProvider"
    );
  }
  return context;
};
