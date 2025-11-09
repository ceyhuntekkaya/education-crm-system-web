import React from "react";
import { Button } from "@/components/ui";
import { useAddToList } from "../context";

interface ModalActionsProps {
  onClose: () => void;
}

export const ModalActions: React.FC<ModalActionsProps> = ({ onClose }) => {
  const { listsLoading } = useAddToList();

  return (
    <div className="d-flex align-items-center gap-12 pt-20 border-top border-neutral-100">
      <Button
        variant="outline"
        onClick={onClose}
        type="button"
        className="btn-outline-main flex-grow-1"
        disabled={listsLoading}
      >
        <i className="ph ph-x me-8" />
        İptal
      </Button>
      <Button
        variant="inline"
        type="submit"
        className="btn-main flex-grow-1"
        disabled={listsLoading}
      >
        <i className="ph-bold ph-bookmark-simple me-8" />
        {listsLoading ? "Kaydediliyor..." : "Okulu Listeye Ekle"}
      </Button>
    </div>
  );
};

