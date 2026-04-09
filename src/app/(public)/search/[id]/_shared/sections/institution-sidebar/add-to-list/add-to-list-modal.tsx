"use client";

import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "@/components/ui";
import { FormProvider } from "@/contexts";
import { FormValues } from "@/types";
import { useAddToList, AddToListProvider } from "./_shared/context";
import {
  SchoolCard,
  ListSection,
  SectionDivider,
  NewListSection,
  ModalActions,
} from "./_shared/sections";

interface AddToListModalProps {
  isOpen: boolean;
  onClose: () => void;
}

/**
 * Form içeriği component'i
 */
const AddToListModalContent: React.FC<{ onClose: () => void }> = ({
  onClose,
}) => {
  const { schoolName } = useAddToList();

  return (
    <>
      <ModalBody scrollable={true}>
        {/* Kurum Hero Kartı */}
        <SchoolCard schoolName={schoolName || "Kurum"} />

        {/* Liste Seçenekleri */}
        <ListSection />

        {/* Ayırıcı */}
        <SectionDivider />

        {/* Yeni Liste Oluştur */}
        <NewListSection />
      </ModalBody>

      <ModalFooter>
        <ModalActions onClose={onClose} />
      </ModalFooter>
    </>
  );
};

/**
 * Add to List Modal
 */
export const AddToListModal: React.FC<AddToListModalProps> = ({
  isOpen,
  onClose,
}) => {
  const initialValues: FormValues = {
    selectedListId: "",
    newListName: "",
  };

  // Scrollbar stilleri için CSS
  const scrollbarStyles = `
    .save-options-scroll::-webkit-scrollbar {
      width: 6px;
    }
    .save-options-scroll::-webkit-scrollbar-track {
      background: #f8fafc;
      border-radius: 3px;
    }
    .save-options-scroll::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;
    }
    .save-options-scroll::-webkit-scrollbar-thumb:hover {
      background: #94a3b8;
    }
  `;

  return (
    <>
      <style>{scrollbarStyles}</style>
      <Modal isOpen={isOpen} onClose={onClose} size="md" scrollable={true}>
        <ModalHeader title="Listeye Ekle" onClose={onClose} />
        <FormProvider initialValues={initialValues}>
          <AddToListProvider onSuccess={onClose}>
            <AddToListModalContent onClose={onClose} />
          </AddToListProvider>
        </FormProvider>
      </Modal>
    </>
  );
};
