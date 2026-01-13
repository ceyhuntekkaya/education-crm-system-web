"use client";

import React from "react";
import type { DetailLoadingState } from "../types";

interface LoadingStateProps {
  config?: DetailLoadingState;
  className?: string;
}

/**
 * Generic loading state component
 */
export const LoadingState: React.FC<LoadingStateProps> = ({
  config,
  className = "",
}) => {
  if (!config?.isLoading) {
    return null;
  }

  if (config.loadingComponent) {
    return <>{config.loadingComponent}</>;
  }

  return (
    <div className={`detail-loading-state ${className}`}>
      <div className="detail-loading-state__container">
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Yükleniyor...</span>
          </div>
          <p className="text-muted mb-0">Veriler yükleniyor...</p>
        </div>
      </div>
    </div>
  );
};
