"use client";

import React from "react";
import { Button } from "@/components/ui/button";

interface StickyFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isEditing?: boolean;
}

export const StickyFooter: React.FC<StickyFooterProps> = ({
  onCancel,
  onSubmit,
  isSubmitting,
  isEditing = false,
}) => {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "8px 24px",
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        gap: "8px",
        zIndex: 1000,
      }}
    >
      <Button
        type="button"
        variant="outline"
        onClick={onCancel}
        disabled={isSubmitting}
      >
        İptal
      </Button>
      <Button
        type="button"
        variant="inline"
        onClick={onSubmit}
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {isEditing ? "Alım İlanını Güncelle" : "Alım İlanını Oluştur"}
      </Button>
    </div>
  );
};
