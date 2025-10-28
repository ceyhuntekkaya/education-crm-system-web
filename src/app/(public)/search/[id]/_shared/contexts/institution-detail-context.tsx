"use client";

import React, { createContext, useContext, ReactNode } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseDto, SchoolDetailDto } from "@/types";
import { formatCurrency, renderStars } from "../utils";

// Context State Interface
interface InstitutionDetailState {
  institutionDetail: SchoolDetailDto | null;
  school: any;
  campus: any;
  brand: any;
  pricings: any;
  loading: boolean;
  error: string | null;
  refetch: () => void;
  // Utility functions
  renderStars: typeof renderStars;
  formatCurrency: typeof formatCurrency;
}

// Context Props Interface
interface InstitutionDetailContextProps {
  id: string;
  children: ReactNode;
}

// Create Context
const InstitutionDetailContext = createContext<
  InstitutionDetailState | undefined
>(undefined);

// Provider Component
export function InstitutionDetailProvider({
  id,
  children,
}: InstitutionDetailContextProps) {
  const {
    data: institutionResponse,
    loading: institutionLoading,
    error: institutionError,
    refetch: refetchInstitution,
  } = useGet<ApiResponseDto<SchoolDetailDto>>(
    id ? API_ENDPOINTS.INSTITUTIONS.SCHOOL_DETAIL(id) : null
  );

  // console.log("institutionResponse", institutionResponse);

  // Backend'den gelen data yapısı doğrudan school bilgilerini içeriyor
  const institutionDetail = institutionResponse?.data || null;

  // school = tüm institution detail datası
  // campus, brand, pricings = nested objeler
  const school = institutionDetail;
  const campus = institutionDetail?.campus || null;
  const brand = institutionDetail?.brand || null;
  const pricings = institutionDetail?.pricings || [];

  const contextValue: InstitutionDetailState = {
    institutionDetail,
    school: school,
    campus: campus,
    brand: brand,
    pricings: pricings,
    loading: institutionLoading,
    error: institutionError,
    refetch: refetchInstitution,
    renderStars,
    formatCurrency,
  };

  return (
    <InstitutionDetailContext.Provider value={contextValue}>
      {children}
    </InstitutionDetailContext.Provider>
  );
}

// Custom Hook to use Context
export function useInstitutionDetail(): InstitutionDetailState {
  const context = useContext(InstitutionDetailContext);

  if (context === undefined) {
    throw new Error(
      "useInstitutionDetail must be used within an InstitutionDetailProvider"
    );
  }

  return context;
}

export default InstitutionDetailContext;
