import { useModal } from "@/hooks/use-modal";
import { useCreateRFQ, RFQCreateDto } from "./api";

interface UseRFQModalParams {
  disableSelectionMode: () => void;
}

/**
 * 🎨 RFQ FORM MODAL HOOK
 * RFQ form modal state ve fonksiyonlarını yönetir
 */
export function useRFQFormModal({ disableSelectionMode }: UseRFQModalParams) {
  const {
    isOpen: isRFQModalOpen,
    open: openRFQModal,
    close: closeRFQModal,
  } = useModal();

  const { mutate: createRFQ, loading: isCreateLoadingRFQ } = useCreateRFQ({
    onSuccess: () => {
      closeRFQModal();
      disableSelectionMode();
    },
    onError: (error) => {
      console.error("RFQ creation error:", error);
    },
  });

  return {
    isRFQModalOpen,
    openRFQModal,
    closeRFQModal,
    submitRFQ: createRFQ,
    isCreateLoadingRFQ,
  };
}
