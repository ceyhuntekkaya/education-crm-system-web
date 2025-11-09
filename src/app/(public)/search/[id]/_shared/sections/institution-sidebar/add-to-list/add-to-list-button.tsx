"use client";

import React from "react";
import { useModal } from "@/hooks";
import { AddToListModal } from "./add-to-list-modal";
import { AddToListProvider } from "./_shared/context";
import { Icon } from "@/components/ui/icon";

export const AddToListButton: React.FC = () => {
  const addToListModal = useModal();

  return (
    <>
      <div className="position-absolute save-button-position z-10">
        <Icon
          icon="ph-bold ph-bookmark-simple"
          variant="outline"
          size="md"
          onClick={addToListModal.open}
          hoverText="Listeye Ekle"
          aria-label="Okulu Listeye Ekle"
        />
      </div>

      <AddToListProvider onSuccess={addToListModal.close}>
        <AddToListModal
          isOpen={addToListModal.isOpen}
          onClose={addToListModal.close}
        />
      </AddToListProvider>
    </>
  );
};
