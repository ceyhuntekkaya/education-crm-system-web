import { useMemo } from "react";
import { useGet } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { ApiResponseSupplierListDto } from "@/types";

/**
 * Tedarikçileri API'den çeken hook
 * useGet hook pattern kullanır (dashboard hooks gibi)
 */
export function useSuppliersData() {
  // useGet hook pattern - otomatik loading/error yönetimi
  const {
    data: response,
    loading,
    error,
  } = useGet<ApiResponseSupplierListDto>(API_ENDPOINTS.SUPPLY.SUPPLIERS.LIST);

  // Transform to SelectOption[] format
  const suppliers = useMemo(() => {
    if (!response?.data) return [];

    return response.data
      .filter((supplier) => supplier.isActive) // Sadece aktif tedarikçiler
      .map((supplier) => ({
        value: supplier.id?.toString() || "",
        label: supplier.companyName || "",
      }))
      .sort((a, b) => a.label.localeCompare(b.label)); // Alfabetik sırala
  }, [response]);

  return {
    data: suppliers,
    loading,
    error,
  };
}
