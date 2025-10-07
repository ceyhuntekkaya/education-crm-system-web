"use client";

import React from "react";

export type BadgeVariant =
  | "primary"
  | "secondary"
  | "success"
  | "danger"
  | "warning"
  | "info";

export interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = "primary",
  children,
  className = "",
}) => {
  return (
    <span
      className={`badge bg-${variant} d-inline-flex align-items-center justify-content-center text-center ${className}`}
    >
      {children}
    </span>
  );
};

export default Badge;
