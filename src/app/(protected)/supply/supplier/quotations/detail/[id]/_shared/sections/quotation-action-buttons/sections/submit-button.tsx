"use client";

import React from "react";

interface SubmitButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const SubmitButton: React.FC<SubmitButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      className="quotation-action-button quotation-action-button--submit"
      onClick={onClick}
      disabled={disabled}
      aria-label="Teklifi gönder"
    >
      <i className="ph ph-paper-plane-tilt"></i>
      <span>Gönder</span>
    </button>
  );
};
