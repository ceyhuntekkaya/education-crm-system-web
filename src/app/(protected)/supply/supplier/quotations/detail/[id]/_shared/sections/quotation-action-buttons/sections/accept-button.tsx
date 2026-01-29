"use client";

import React from "react";

interface AcceptButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const AcceptButton: React.FC<AcceptButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      className="quotation-action-button quotation-action-button--accept"
      onClick={onClick}
      disabled={disabled}
      aria-label="Teklifi kabul et"
    >
      <i className="ph ph-check-circle"></i>
      <span>Kabul Et</span>
    </button>
  );
};
