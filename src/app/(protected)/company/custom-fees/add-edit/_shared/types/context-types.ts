import { CustomFeeCreateDto, CustomFeeDto, ApiResponseDto } from "@/types";

export interface CustomFeeAddEditContextType {
  // Current custom fee data
  customFee: CustomFeeDto | null;
  dataLoading: boolean; // Detay çekme loading'i (CustomCard'da gösterilir)
  customFeeError: string | null;

  // Form operations
  formLoading: boolean; // Form submit loading'i (Sadece form butonlarında gösterilir)

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
