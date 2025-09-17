"use client";

import React from "react";

export interface AppointmentTableHeaderProps {
  title?: string;
}

export const AppointmentTableHeader: React.FC<AppointmentTableHeaderProps> = ({
  title,
}) => {
  if (!title) return null;

  return (
    <>
      <h4 className="mb-16">{title}</h4>
      <span className="d-block border border-neutral-30 my-24 border-dashed" />
    </>
  );
};

export default AppointmentTableHeader;
