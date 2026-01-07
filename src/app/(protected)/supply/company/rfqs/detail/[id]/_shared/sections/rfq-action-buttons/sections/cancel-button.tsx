"use client";

import React from "react";

interface CancelButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const CancelButton: React.FC<CancelButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      className="rfq-action-button rfq-action-button--cancel"
      onClick={onClick}
      disabled={disabled}
      aria-label="İlanı iptal et"
    >
      <i className="ph ph-x-circle"></i>
      <span>İptal Et</span>
    </button>
  );
};
