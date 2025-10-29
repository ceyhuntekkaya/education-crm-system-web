import { CustomFeeCreateDto, CustomFeeDto, ApiResponseDto } from "@/types";

export interface CustomFeeAddEditContextType {
  // Current custom fee data
  customFee: CustomFeeDto | null;
  customFeeLoading: boolean;
  customFeeError: string | null;

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
