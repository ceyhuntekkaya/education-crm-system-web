import React from "react";
import { useModal } from "@/hooks";
import { Button } from "@/components/ui";
import { SaveFavoriteSearchModal } from "./save-favorite-search-modal";

export const SaveFavoriteSearchButton: React.FC = () => {
  const saveModal = useModal();

  return (
    <>
      <Button onClick={saveModal.open} variant="outline" leftIcon="ph-heart">
        Favori Arama Kaydet
      </Button>

      <SaveFavoriteSearchModal
        isOpen={saveModal.isOpen}
        onClose={saveModal.close}
      />
    </>
  );
};
