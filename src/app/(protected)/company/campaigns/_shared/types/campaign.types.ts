import { CampaignDto } from "@/types/dto/campaign/CampaignDto";
import { CampaignSummaryDto } from "@/types/dto/campaign/CampaignSummaryDto";
import { ReactNode } from "react";

/**
 * Campaign column handlers interface
 * Defines the callback functions for campaign table actions
 */
export interface CampaignColumnHandlers {
  onViewDetails: (campaign: CampaignDto | CampaignSummaryDto) => void;
  onEdit: (campaign: CampaignDto | CampaignSummaryDto) => void;
  onToggleStatus: (campaign: CampaignDto | CampaignSummaryDto) => void;
  onDelete?: (campaign: CampaignDto | CampaignSummaryDto) => void;
  onDuplicate?: (campaign: CampaignDto | CampaignSummaryDto) => void;
}

/**
 * Badge variant types for campaign status display
 */
export type BadgeVariant =
  | "success"
  | "warning"
  | "danger"
  | "secondary"
  | "info";

/**
 * Campaign action buttons component props
 */
export interface CampaignActionButtonsProps {
  campaign: CampaignDto | CampaignSummaryDto;
  onViewDetails?: (campaign: CampaignDto | CampaignSummaryDto) => void;
  onEdit?: (campaign: CampaignDto | CampaignSummaryDto) => void;
  onToggleStatus?: (campaign: CampaignDto | CampaignSummaryDto) => void;
  onDelete?: (campaign: CampaignDto | CampaignSummaryDto) => void;
  onDuplicate?: (campaign: CampaignDto | CampaignSummaryDto) => void;
}

/**
 * Campaign table component props
 */
export interface CampaignTableProps {
  campaigns?: (CampaignDto | CampaignSummaryDto)[];
  loading?: boolean;
}

/**
 * Campaigns context type
 */
export interface CampaignsContextType {
  // Campaign data
  campaigns: CampaignDto[];
  campaignsLoading: boolean;
  campaignsError: string | null;

  // Actions
  refetchCampaigns: () => void;
}

/**
 * Campaign statistics interface
 */
export interface CampaignStats {
  total: number;
  active: number;
  pending: number;
  expired: number;
  paused: number;
  totalApplications: number;
  totalConversions: number;
  averageConversionRate: number;
}
