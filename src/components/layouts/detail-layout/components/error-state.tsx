"use client";

import React from "react";
import type { DetailErrorState } from "../types";

interface ErrorStateProps {
  config?: DetailErrorState;
  className?: string;
}

/**
 * Generic error state component
 */
export const ErrorState: React.FC<ErrorStateProps> = ({
  config,
  className = "",
}) => {
  if (!config?.error) {
    return null;
  }

  if (config.errorComponent) {
    return <>{config.errorComponent}</>;
  }

  const errorMessage =
    typeof config.error === "string"
      ? config.error
      : config.error.message || "Bir hata oluştu";

  // Default retry handler
  const handleRetry =
    config.onRetry ||
    (() => {
      window.location.reload();
    });

  return (
    <div className={`detail-error-state ${className}`}>
      <div className="detail-error-state__container">
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <i
            className="fas fa-exclamation-triangle text-danger mb-3"
            style={{ fontSize: "3rem" }}
          />
          <h5 className="text-danger mb-2">Hata Oluştu</h5>
          <p className="text-muted text-center mb-3">{errorMessage}</p>
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            onClick={handleRetry}
          >
            <i className="fas fa-sync-alt me-1" />
            Yeniden Dene
          </button>
        </div>
      </div>
    </div>
  );
};
