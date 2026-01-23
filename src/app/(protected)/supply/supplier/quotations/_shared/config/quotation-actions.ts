import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import type { ActionButton } from "@/components/layouts/data-collection-layout";

type EmptyStateAction = {
  label: string;
  icon: string;
  onClick: () => void;
};

/**
 * 🎬 QUOTATION ACTION BUTTONS
 * Header action buttons konfigürasyonu
 */
export const createQuotationActionButtons = (
  router: AppRouterInstance,
): ActionButton[] => [
  {
    label: "Yeni Teklif Oluştur",
    icon: "ph-plus",
    variant: "primary",
    onClick: () => {
      // TODO: RFQ seçimi için modal açılacak veya RFQ listesine yönlendirilecek
      // Şimdilik örnek bir RFQ ID ile yönlendirme yapıyoruz
      const exampleRfqId = 1; // Gerçek uygulamada bu dinamik olacak
      router.push(
        `/supply/supplier/quotations/add-edit/new?rfqId=${exampleRfqId}`,
      );
    },
  },
];

/**
 * 🎬 QUOTATION EMPTY STATE ACTION
 * Empty state action button konfigürasyonu
 */
export const createQuotationEmptyStateAction = (
  router: AppRouterInstance,
): EmptyStateAction => ({
  label: "İlk Teklifi Oluştur",
  icon: "ph-plus",
  onClick: () => {
    // TODO: RFQ seçimi için modal açılacak veya RFQ listesine yönlendirilecek
    // Şimdilik örnek bir RFQ ID ile yönlendirme yapıyoruz
    const exampleRfqId = 1; // Gerçek uygulamada bu dinamik olacak
    router.push(
      `/supply/supplier/quotations/add-edit/new?rfqId=${exampleRfqId}`,
    );
  },
});
