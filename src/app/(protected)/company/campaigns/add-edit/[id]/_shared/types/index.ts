// Campaign Add/Edit Types
// Export all campaign-related types and interfaces here

import { CampaignCreateDto } from "@/types/dto/campaign/CampaignCreateDto";

export interface CampaignFormData extends CampaignCreateDto {
  id?: string;
}

export interface CampaignAddEditContextType {
  formData: CampaignFormData;
  setFormData: (data: CampaignFormData) => void;
  isEditMode: boolean;
  campaignId: string;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  handleSave: () => Promise<void>;
  handleCancel: () => void;
}

export {};
