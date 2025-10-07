import React from "react";
import { useModal } from "@/hooks";
import { SaveModal } from "./save-modal";
import { Icon } from "@/components/ui/icon";

export const SaveButton: React.FC = () => {
  const saveModal = useModal();

  return (
    <>
      <div className="position-absolute save-button-position z-10">
        <Icon
          icon="ph-bold ph-bookmark-simple"
          variant="outline"
          size="md"
          onClick={saveModal.open}
          hoverText="Listeye Ekle"
          aria-label="Okulu Kaydet"
        />
      </div>

      <SaveModal isOpen={saveModal.isOpen} onClose={saveModal.close} />
    </>
  );
};
