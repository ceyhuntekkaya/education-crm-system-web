import React from "react";
import { Button } from "@/components/ui";
import { useAddToList } from "../context";

interface ModalActionsProps {
  onClose: () => void;
}

export const ModalActions: React.FC<ModalActionsProps> = ({ onClose }) => {
  const { listsLoading } = useAddToList();

  return (
    <div className="d-flex align-items-center justify-content-end gap-12 pt-20 border-top border-neutral-100">
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
        type="submit"
        disabled={listsLoading}
        leftIcon="ph-bold ph-bookmark-simple"
      >
        {listsLoading ? "Kaydediliyor..." : "Kurumu Listeye Ekle"}
      </Button>
    </div>
  );
};
