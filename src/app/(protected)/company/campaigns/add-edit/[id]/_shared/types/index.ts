// Campaign Add/Edit Types
// Export all campaign-related types and interfaces here

export interface CampaignFormData {
  id?: string;
  name: string;
  description: string;
  startDate: Date;
  endDate: Date;
  status: string;
  targetAudience: string[];
  budget?: number;
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
