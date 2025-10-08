"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { CampaignFormData, CampaignAddEditContextType } from "../types";

const CampaignAddEditContext = createContext<
  CampaignAddEditContextType | undefined
>(undefined);

interface CampaignAddEditProviderProps {
  children: React.ReactNode;
}

export const CampaignAddEditProvider: React.FC<
  CampaignAddEditProviderProps
> = ({ children }) => {
  const params = useParams();
  const router = useRouter();
  const campaignId = params.id as string;
  const isEditMode = campaignId !== "new";

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<CampaignFormData>({
    name: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
    status: "draft",
    targetAudience: [],
    budget: 0,
  });

  const handleSave = useCallback(async () => {
    setIsLoading(true);
    try {
      // TODO: Implement actual save logic
      console.log("Saving campaign...", { campaignId, isEditMode, formData });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Navigate back to campaigns list after successful save
      router.push("/company/campaigns");
    } catch (error) {
      console.error("Error saving campaign:", error);
      // TODO: Show error message to user
    } finally {
      setIsLoading(false);
    }
  }, [campaignId, isEditMode, formData, router]);

  const handleCancel = useCallback(() => {
    router.back();
  }, [router]);

  const contextValue: CampaignAddEditContextType = {
    formData,
    setFormData,
    isEditMode,
    campaignId,
    isLoading,
    setIsLoading,
    handleSave,
    handleCancel,
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

export default CampaignAddEditProvider;
