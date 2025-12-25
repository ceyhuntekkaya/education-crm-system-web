"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseSupplierDto, SupplierDto } from "@/types";

interface UseSupplierByIdReturn {
  supplier: SupplierDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir supplier verisi getiren hook
 * @param id - Supplier ID'si
 * @returns Supplier verisi ve yönetim fonksiyonları
 */
export const useSupplierById = (id?: number): UseSupplierByIdReturn => {
  const {
    data: supplierResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseSupplierDto>(
    id ? API_ENDPOINTS.SUPPLY.SUPPLIERS.BY_ID(id) : null
  );

  return {
    supplier: supplierResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
