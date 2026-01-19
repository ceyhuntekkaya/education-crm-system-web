"use client";

import React from "react";

interface CloseButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const CloseButton: React.FC<CloseButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      className="rfq-action-button rfq-action-button--close"
      onClick={onClick}
      disabled={disabled}
      aria-label="İlanı kapat"
    >
      <i className="ph ph-lock"></i>
      <span>Kapat</span>
    </button>
  );
};
