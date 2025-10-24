import { CampaignDto, CampaignCreateDto, ApiResponseDto } from "@/types";
import { MutationOptions } from "@/hooks";

export interface CampaignFormOptions {
  campaignTypeOptions: Array<{ label: string; value: string }>;
  discountTypeOptions: Array<{ label: string; value: string }>;
  targetAudienceOptions: Array<{ label: string; value: string }>;
}

export interface CampaignAddEditContextType {
  // Current campaign data
  campaign: CampaignDto | null;
  campaignLoading: boolean;
  campaignError: string | null;

  // Edit mode state
  isEditing: boolean;
  campaignId: string | null;

  // Form options
  formOptions: CampaignFormOptions;

  // Actions
  fetchCampaign: (() => void) | undefined;
  postCampaign: (
    data: CampaignCreateDto,
    mutationOptions?: MutationOptions<
      ApiResponseDto<CampaignDto>,
      CampaignCreateDto
    >
  ) => Promise<ApiResponseDto<CampaignDto> | null>;
  putCampaign: (
    data: CampaignCreateDto,
    mutationOptions?: MutationOptions<
      ApiResponseDto<CampaignDto>,
      CampaignCreateDto
    >
  ) => Promise<ApiResponseDto<CampaignDto> | null>;
  deleteCampaign: (
    data: unknown,
    mutationOptions?: MutationOptions<ApiResponseDto<void>, unknown>
  ) => Promise<ApiResponseDto<void> | null>;
}
