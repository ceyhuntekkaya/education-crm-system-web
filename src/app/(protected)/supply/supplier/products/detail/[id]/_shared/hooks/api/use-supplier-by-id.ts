"use client";

import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseSupplierDto, SupplierDto } from "@/types";
import { useProductsContext } from "../../../../../_shared/contexts";

interface UseSupplierByIdReturn {
  supplier: SupplierDto | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

/**
 * ID'ye göre tek bir supplier verisi getiren hook
 * Context'ten currentProduct'ın supplierId'sini alır
 * @returns Supplier verisi ve yönetim fonksiyonları
 */
export const useSupplierById = (): UseSupplierByIdReturn => {
  const { currentProduct } = useProductsContext();
  const supplierId = currentProduct?.supplierId;

  const {
    data: supplierResponse,
    loading: isLoading,
    error,
    refetch,
  } = useGet<ApiResponseSupplierDto>(
    supplierId ? API_ENDPOINTS.SUPPLY.SUPPLIERS.BY_ID(supplierId) : null,
  );

  return {
    supplier: supplierResponse?.data || null,
    isLoading,
    error,
    refetch,
  };
};
