import { CustomFeeCreateDto, CustomFeeDto, ApiResponseDto } from "@/types";

export interface CustomFeeAddEditContextType {
  // Current custom fee data
  customFee: CustomFeeDto | null;
  dataLoading: boolean; // Sadece data fetch için
  customFeeError: string | null;

  // Form operations
  formLoading: boolean; // Sadece form submit için

  // Edit mode state
  isEditing: boolean;
  customFeeId: string | null;

  // Actions
  fetchCustomFee: (() => void) | undefined;
  postCustomFee: (
    data: CustomFeeCreateDto
  ) => Promise<ApiResponseDto<CustomFeeDto> | null>;
  putCustomFee: (
    data: CustomFeeCreateDto
  ) => Promise<ApiResponseDto<CustomFeeDto> | null>;
}
