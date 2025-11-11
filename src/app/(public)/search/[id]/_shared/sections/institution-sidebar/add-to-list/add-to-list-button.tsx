"use client";

import React from "react";
import { useModal } from "@/hooks";
import { AddToListModal } from "./add-to-list-modal";
import { Icon } from "@/components/ui/icon";
import { useAuth } from "@/contexts/auth-context";

export const AddToListButton: React.FC = () => {
  const addToListModal = useModal();
  const { user } = useAuth();

  // Kullanıcı giriş yapmamışsa butonu gösterme
  if (!user) {
    return null;
  }

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

      <AddToListModal
        isOpen={addToListModal.isOpen}
        onClose={addToListModal.close}
      />
    </>
  );
};
