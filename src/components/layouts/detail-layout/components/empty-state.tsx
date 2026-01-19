"use client";

import React from "react";
import { ActionButton } from "./action-button";
import type { DetailEmptyState } from "../types";

interface EmptyStateProps {
  config?: DetailEmptyState;
  className?: string;
}

/**
 * Generic empty state component
 */
export const EmptyState: React.FC<EmptyStateProps> = ({
  config,
  className = "",
}) => {
  if (!config?.isEmpty) {
    return null;
  }

  if (config.emptyComponent) {
    return <>{config.emptyComponent}</>;
  }

  const {
    emptyTitle = "Veri Bulunamadı",
    emptyDescription = "İlgili bilgi bulunamadı.",
    emptyAction,
  } = config;

  return (
    <div className={`detail-empty-state ${className}`}>
      <div className="detail-empty-state__container">
        <div className="d-flex flex-column align-items-center justify-content-center py-5">
          <i
            className="fas fa-inbox text-muted mb-3"
            style={{ fontSize: "3rem" }}
          />
          <h5 className="text-muted mb-2">{emptyTitle}</h5>
          <p className="text-muted text-center mb-3">{emptyDescription}</p>
          {emptyAction && <ActionButton config={emptyAction} />}
        </div>
      </div>
    </div>
  );
};
