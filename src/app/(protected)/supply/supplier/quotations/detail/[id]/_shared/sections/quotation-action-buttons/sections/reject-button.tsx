"use client";

import React from "react";

interface RejectButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const RejectButton: React.FC<RejectButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      className="quotation-action-button quotation-action-button--reject"
      onClick={onClick}
      disabled={disabled}
      aria-label="Teklifi reddet"
    >
      <i className="ph ph-x-circle"></i>
      <span>Reddet</span>
    </button>
  );
};
