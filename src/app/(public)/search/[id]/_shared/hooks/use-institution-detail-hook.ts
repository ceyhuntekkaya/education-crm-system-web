"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SchoolDetailDto } from "@/types";

interface UseInstitutionDetailHookParams {
  id: string;
}

export function useInstitutionDetailHook({
  id,
}: UseInstitutionDetailHookParams) {
  const {
    data: institutionResponse,
    loading: institutionLoading,
    error: institutionError,
    refetch: refetchInstitution,
  } = useGet<ApiResponseDto<SchoolDetailDto>>(
    id ? API_ENDPOINTS.INSTITUTIONS.SCHOOL_DETAIL(id) : null
  );

  return {
    institutionDetail: institutionResponse?.data,
    loading: institutionLoading,
    error: institutionError,
    refetch: refetchInstitution,
  };
}

export default useInstitutionDetailHook;
