import { CampaignDto } from "@/types/dto/campaign/CampaignDto";
import { ReactNode } from "react";

/**
 * Campaign column handlers interface
 * Defines the callback functions for campaign table actions
 */
export interface CampaignColumnHandlers {
  onViewDetails: (campaign: CampaignDto) => void;
  onEdit: (campaign: CampaignDto) => void;
  onToggleStatus: (campaign: CampaignDto) => void;
  onDelete?: (campaign: CampaignDto) => void;
  onDuplicate?: (campaign: CampaignDto) => void;
}

/**
 * Badge variant types for campaign status display
 */
export type BadgeVariant = "success" | "warning" | "danger" | "secondary" | "info";

/**
 * Campaign action buttons component props
 */
export interface CampaignActionButtonsProps {
  campaign: CampaignDto;
  onViewDetails?: (campaign: CampaignDto) => void;
  onEdit?: (campaign: CampaignDto) => void;
  onToggleStatus?: (campaign: CampaignDto) => void;
  onDelete?: (campaign: CampaignDto) => void;
  onDuplicate?: (campaign: CampaignDto) => void;
}

/**
 * Campaign table component props
 */
export interface CampaignTableProps {
  campaigns?: CampaignDto[];
  loading?: boolean;
}

/**
 * Campaigns context type
 */
export interface CampaignsContextType {
  // Campaign context properties will be added here
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
