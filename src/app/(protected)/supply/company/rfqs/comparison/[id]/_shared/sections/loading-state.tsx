"use client";

import React from "react";

/**
 * Comparison loading state
 */
export const LoadingState: React.FC = () => {
  return (
    <div className="comparison-loading">
      <div className="comparison-loading__spinner">
        <i className="ph ph-spinner"></i>
      </div>
      <p className="comparison-loading__text">Teklifler karşılaştırılıyor...</p>
    </div>
  );
};
