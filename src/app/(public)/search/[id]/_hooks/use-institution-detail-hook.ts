"use client";

import { useEffect } from "react";
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

  // Log for debugging
  useEffect(() => {
    if (institutionResponse?.data) {
      console.log("Institution detail loaded:", institutionResponse.data);
    }
    if (institutionError) {
      console.error("Institution detail error:", institutionError);
    }
  }, [institutionResponse, institutionError]);

  return {
    schoolDetail: institutionResponse?.data,
    loading: institutionLoading,
    error: institutionError,
    refetch: refetchInstitution,
  };
}

export default useInstitutionDetailHook;
