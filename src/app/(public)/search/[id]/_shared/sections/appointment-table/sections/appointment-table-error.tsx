"use client";

import React from "react";

export interface AppointmentTableErrorProps {
  error: string | null;
}

export const AppointmentTableError: React.FC<AppointmentTableErrorProps> = ({
  error,
}) => {
  if (!error) return null;

  return (
    <div className="alert alert-danger mb-3">
      <i className="ph ph-warning me-2"></i>
      {error}
    </div>
  );
};

export default AppointmentTableError;
