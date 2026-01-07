"use client";

import React from "react";

interface PublishButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export const PublishButton: React.FC<PublishButtonProps> = ({
  onClick,
  disabled,
}) => {
  return (
    <button
      className="rfq-action-button rfq-action-button--publish"
      onClick={onClick}
      disabled={disabled}
      aria-label="İlanı yayınla"
    >
      <i className="ph ph-paper-plane-tilt"></i>
      <span>Yayınla</span>
    </button>
  );
};
