import React from "react";
import { useModal } from "@/hooks";
import { SaveModal } from "./save-modal";

export const SaveButton: React.FC = () => {
  const saveModal = useModal();

  return (
    <>
      <button
        onClick={saveModal.open}
        className="position-absolute text-main-600 hover-text-white w-40-px h-40-px rounded-circle border border-main-600 hover-bg-main-600 flex-center transition-all"
        style={{
          top: "16px",
          right: "16px",
          zIndex: 10,
        }}
        aria-label="Okulu Kaydet"
      >
        <i className="ph-bold ph-bookmark-simple text-lg" />
      </button>

      <SaveModal isOpen={saveModal.isOpen} onClose={saveModal.close} />
    </>
  );
};
