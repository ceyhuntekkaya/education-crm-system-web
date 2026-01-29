"use client";

import { apiClient } from "@/lib/api/client";
import { API_ENDPOINTS } from "@/lib";
import { RFQItemDto, RFQItemCreateDto } from "@/types";

/**
 * RFQ Item ekleme hook'u - Add/Edit context için
 * Liste sayfasında refetch yapmadan sadece API'ye istek atar
 */
export const useAddRFQItemForAddEdit = () => {
  // Wrapper function that accepts rfqId
  const postRFQItem = async (
    rfqId: number,
    data: RFQItemCreateDto,
  ): Promise<RFQItemDto | null> => {
    try {
      const endpoint = API_ENDPOINTS.SUPPLY.RFQ_ITEMS.CREATE(rfqId);

      const response = await apiClient.post<RFQItemDto>(endpoint, data, {
        headers: {
          "X-Show-Snackbar": "true",
        },
      });

      return response.data;
    } catch (error) {
      console.error("❌ RFQ Item eklenirken hata:", error);
      throw error;
    }
  };

  return {
    postRFQItem,
    isLoading: false,
    error: null,
  };
};
