import { CampaignDto } from "@/types";

/**
 * Campaign Detail Context için türler
 */

export interface CampaignDetailContextValue {
  campaignId: number;
  campaign: CampaignDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export interface CampaignDetailProviderProps {
  children: React.ReactNode;
  campaignId: number;
}
