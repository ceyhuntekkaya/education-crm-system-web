"use client";

import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { useParams } from "next/navigation";
import { CampaignAddEditContextType } from "../types";
import {
  useCampaignById,
  useAddCampaign,
  useEditCampaign,
  useDeleteCampaign,
} from "../hooks";
import { isValidEditId, parseEditId } from "../utils";
import { CampaignType, DiscountType, TargetAudience } from "@/enums";
import {
  CAMPAIGN_TYPE_LABELS,
  DISCOUNT_TYPE_LABELS,
  TARGET_AUDIENCE_LABELS,
} from "../utils/enum-translations";

const CampaignAddEditContext = createContext<
  CampaignAddEditContextType | undefined
>(undefined);

interface CampaignAddEditProviderProps {
  children: ReactNode;
}

export const CampaignAddEditProvider: React.FC<
  CampaignAddEditProviderProps
> = ({ children }) => {
  const params = useParams();
  const { id } = params;

  // ID parsing and edit mode determination
  const isEditing = isValidEditId(id);
  const campaignId = parseEditId(id);

  // Campaign data hook
  const {
    campaign,
    isLoading: campaignLoading,
    error: campaignError,
    refetch,
  } = useCampaignById(campaignId);

  // Add campaign hook
  const {
    postCampaign,
    isLoading: addLoading,
    error: addError,
  } = useAddCampaign();

  // Edit campaign hook - refetch'i props olarak geçir
  const {
    putCampaign,
    isLoading: editLoading,
    error: editError,
  } = useEditCampaign({
    campaignId: campaignId || 0,
    refetch: isEditing ? refetch : undefined,
  });

  // Delete campaign hook
  const { deleteCampaign, isLoading: deleteLoading } = useDeleteCampaign();

  // Form options - memoized
  const formOptions = useMemo(
    () => ({
      campaignTypeOptions: Object.entries(CampaignType).map(([key, value]) => ({
        label: CAMPAIGN_TYPE_LABELS[value as CampaignType],
        value: value,
      })),
      discountTypeOptions: Object.entries(DiscountType).map(([key, value]) => ({
        label: DISCOUNT_TYPE_LABELS[value as DiscountType],
        value: value,
      })),
      targetAudienceOptions: Object.entries(TargetAudience).map(
        ([key, value]) => ({
          label: TARGET_AUDIENCE_LABELS[value as TargetAudience],
          value: value,
        })
      ),
    }),
    []
  );

  const contextValue: CampaignAddEditContextType = {
    // Current campaign data
    campaign,
    campaignLoading:
      campaignLoading || addLoading || editLoading || deleteLoading,
    campaignError: campaignError || addError || editError,

    // Edit mode state
    isEditing,
    campaignId: campaignId?.toString() || null,

    // Form options
    formOptions,

    // Actions
    fetchCampaign: refetch,
    postCampaign,
    putCampaign,
    deleteCampaign,
  };

  return (
    <CampaignAddEditContext.Provider value={contextValue}>
      {children}
    </CampaignAddEditContext.Provider>
  );
};

export const useCampaignAddEdit = (): CampaignAddEditContextType => {
  const context = useContext(CampaignAddEditContext);
  if (context === undefined) {
    throw new Error(
      "useCampaignAddEdit must be used within a CampaignAddEditProvider"
    );
  }
  return context;
};
