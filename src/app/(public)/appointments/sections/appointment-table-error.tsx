"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";

export interface AppointmentTableErrorProps {
  error: string | null;
  onRetry?: () => void;
}

export const AppointmentTableError: React.FC<AppointmentTableErrorProps> = ({
  error,
  onRetry,
}) => {
  if (!error) return null;

  return (
    <div className="alert alert-danger d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center">
        <Icon icon="ph-warning-circle" className="me-12 text-danger" />
        <span>{error}</span>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="btn btn-sm btn-outline-danger ms-16"
        >
          <Icon icon="ph-arrow-clockwise" size="sm" className="me-8" />
          Tekrar Dene
        </button>
      )}
    </div>
  );
};

export default AppointmentTableError;
