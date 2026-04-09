import React from "react";
import { Button } from "@/components/ui";
import { useForm } from "@/contexts";
import { useAddToList } from "../context";

interface ModalActionsProps {
  onClose: () => void;
}

export const ModalActions: React.FC<ModalActionsProps> = ({ onClose }) => {
  const { listsLoading, handleFormSubmit } = useAddToList();
  const { values, validate } = useForm();

  const handleSave = async () => {
    const isValid = await validate();
    if (!isValid) return;
    await handleFormSubmit(values);
  };

  return (
    <div className="d-flex align-items-center justify-content-end gap-12">
      <Button
        variant="outline"
        onClick={onClose}
        type="button"
        disabled={listsLoading}
        leftIcon="ph ph-x"
      >
        İptal
      </Button>
      <Button
        variant="inline"
        type="button"
        onClick={handleSave}
        disabled={listsLoading}
        leftIcon="ph-bold ph-bookmark-simple"
      >
        {listsLoading ? "Kaydediliyor..." : "Kurumu Listeye Ekle"}
      </Button>
    </div>
  );
};
