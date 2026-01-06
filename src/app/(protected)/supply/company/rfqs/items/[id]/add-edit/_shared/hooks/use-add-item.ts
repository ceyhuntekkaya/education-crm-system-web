"use client";

import { usePost } from "@/hooks";
import { API_ENDPOINTS } from "@/lib";
import { RFQItemDto, RFQItemCreateDto } from "@/types";
import { useRouter } from "next/navigation";
import { useRFQItemsContext } from "../../../_shared/contexts";

interface UseAddItemProps {
  rfqId: number;
}

/**
 * RFQ Item ekleme hook'u
 */
export const useAddItem = ({ rfqId }: UseAddItemProps) => {
  const router = useRouter();
  const { itemsListRefetch: refetch } = useRFQItemsContext();

  const {
    mutate: postItem,
    loading: isLoading,
    error,
  } = usePost<RFQItemDto, RFQItemCreateDto>(
    API_ENDPOINTS.SUPPLY.RFQ_ITEMS.CREATE(rfqId),
    {
      onSuccess: (data) => {
        // Liste API'sine tekrar istek at
        refetch();
        // Items sayfasına yönlendir
        router.push(`/supply/company/rfqs/items/${rfqId}`);
      },
      onError: (error) => {
        console.error("❌ RFQ Item eklenirken hata:", error);
      },
    }
  );

  return {
    postItem,
    isLoading,
    error,
  };
};
